import {useCallback, useEffect, useState} from 'react';
import type {GameConfig, GameGrid, GameState, GridCell, MapState, Player, PlayerBase} from '../types';
import {initializeGrid} from '../components/floor/gridUtils.ts';
import {notifyWarning} from "../utils/toast/notifier.tsx";
import {fetchJson} from "../utils/input/configFilesUtils.ts";

interface GameMapStateResult {
    mapState: MapState;
    actions: {
        conquerTerritory: (winnerName: string, loserName: string, inheritedCategory: string) => void;
        handleCellClick: (cell: GridCell) => void;
        handlePassFloorClick: () => void;
        decreaseTimeBoostsOfPlayer: (playerName: string) => void;
        findPlayerByName: (name: string) => Player | undefined
    };
}

export const useGameMapState = (
    gameConfig: GameConfig,
    gameState: GameState,
    startDuelCallback: (challenger: Player, defender: Player) => void,
): GameMapStateResult => {
    const [grid, setGrid] = useState<GameGrid>([]);
    const [activeMapPlayer, setActiveMapPlayer] = useState<Player | null>(null);
    const [allPlayers, setAllPlayers] = useState<Player[]>([]);
    const [hasWonPreviousDuel, setHasWonPreviousDuel] = useState(false);
    const [positionToPlayer, setPositionToPlayer] = useState<Map<number, Player>>(new Map());

    useEffect(() => {
        if (gameState === 'init') {
            fetchJson<PlayerBase[]>("./players.json", []).then(playersConfig => {
                setGrid(initializeGrid(playersConfig, gameConfig.shufflePlayers));
                const initializedPlayers: Player[] = playersConfig.map(playerBase => ({
                    ...playerBase,
                    isPlaying: true,
                    winStreak: 0,
                    duelsWon: 0,
                    timeBoostsAvailable: 0,
                    timeBoostsUsed: 0
                }))
                setAllPlayers(initializedPlayers)
                const firstPlayer = initializedPlayers[Math.floor(Math.random() * playersConfig.length)];
                setActiveMapPlayer(firstPlayer);
            })
        }
    }, [gameState, gameConfig.shufflePlayers]);

    // TODO: refactor this method
    const conquerTerritory = useCallback((winnerName: string, loserName: string, inheritedCategory: string) => {
        setAllPlayers(prevPlayers => {
            const winner = prevPlayers.find(p => p.name === winnerName);
            const loser = prevPlayers.find(p => p.name === loserName);

            if (!winner || !loser) return prevPlayers;

            const earnedTimeBoost = (winner.winStreak + 1) === gameConfig.winStreakForTimeBoost;

            const updatedWinner = {
                ...winner,
                category: inheritedCategory,
                winStreak: earnedTimeBoost ? 0 : winner.winStreak + 1,
                duelsWon: winner.duelsWon + 1,
                timeBoostsAvailable: earnedTimeBoost ? winner.timeBoostsAvailable + 1 : winner.timeBoostsAvailable
            };

            const updatedLoser = {...loser, isPlaying: false};

            const nextAllPlayers = prevPlayers.map(p => {
                if (p.name === winnerName) return updatedWinner;
                if (p.name === loserName) return updatedLoser;
                return p;
            });

            setGrid(currentGrid => currentGrid.map(row =>
                row.map(cell => cell.ownerName === loserName ? {...cell, ownerName: winnerName} : cell)
            ));

            setActiveMapPlayer(updatedWinner);

            const stillPlayingPlayers = prevPlayers.filter(player => player.isPlaying)
            const newPlayerMap = new Map(positionToPlayer);
            const position = stillPlayingPlayers.length;
            newPlayerMap.set(position, updatedLoser);
            if (stillPlayingPlayers.length === 2) {
                newPlayerMap.set(1, updatedWinner);
            }
            setPositionToPlayer(newPlayerMap);

            return nextAllPlayers;
        });

        setHasWonPreviousDuel(true);
    }, [positionToPlayer]);

    const findPlayerByName = useCallback((name: string): Player | undefined => {
        return allPlayers.find(player => player.name === name)
    }, [allPlayers]);

    const handleCellClick = useCallback((cell: GridCell) => {
        if (gameState !== 'floor' || !activeMapPlayer) return;

        if (!cell.ownerName || cell.ownerName === activeMapPlayer.name) {
            notifyWarning("Kliknij pole przeciwnika!")
            return;
        }

        const currentChallenger = findPlayerByName(activeMapPlayer.name)
        const currentDefender = findPlayerByName(cell.ownerName)

        if (currentChallenger && currentDefender) {
            startDuelCallback(currentChallenger, currentDefender);
        }
    }, [gameState, activeMapPlayer, findPlayerByName, startDuelCallback]);

    const handlePassFloorClick = useCallback(() => {
        setAllPlayers(prevPlayers => {
            if (!activeMapPlayer) return prevPlayers

            return prevPlayers.map(p => {
                if (p.name === activeMapPlayer.name) return {...p, winStreak: 0};
                return p;
            });
        })

        const potentialNextPlayers: Player[] = allPlayers
            .filter(player => player.isPlaying)
            .filter(player => player.name !== activeMapPlayer?.name)

        if (potentialNextPlayers.length === 0) {
            notifyWarning("Brak innych graczy do wylosowania")
            return null;
        }

        const randomIndex = Math.floor(Math.random() * potentialNextPlayers.length)
        setActiveMapPlayer(potentialNextPlayers[randomIndex])
        setHasWonPreviousDuel(false)
    }, [activeMapPlayer?.name, allPlayers]);


    const decreaseTimeBoostsOfPlayer = useCallback((playerName: string) => {
        const newPlayers = allPlayers.map(p => p.name === playerName
            ? {...p, timeBoostsAvailable: p.timeBoostsAvailable - 1}
            : p)
        setAllPlayers(newPlayers)
    }, [allPlayers]);

    const mapState: MapState = {
        grid,
        allPlayers,
        activeMapPlayer,
        hasWonPreviousDuel,
        positionToPlayer,
    };

    return {
        mapState,
        actions: {
            conquerTerritory,
            handleCellClick,
            handlePassFloorClick,
            decreaseTimeBoostsOfPlayer,
            findPlayerByName
        },
    };
};
