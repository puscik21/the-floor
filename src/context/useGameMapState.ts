import {useCallback, useEffect, useState} from 'react';
import type {GameGrid, GameState, GridCell, MapState, Player, PlayerBase} from '../types';
import {initializeGrid} from '../components/floor/gridUtils.ts';
import {notifyWarning} from "../utils/toast/notifier.tsx";
import {fetchJson} from "../utils/input/configFilesUtils.ts";

interface GameMapStateResult {
    mapState: MapState;
    actions: {
        conquerTerritory: (winnerPlayer: Player, loserPlayer: Player, inheritedCategory: string) => void;
        handleCellClick: (cell: GridCell) => void;
        handlePassFloorClick: () => void;
    };
}

export const useGameMapState = (
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
                setGrid(initializeGrid(playersConfig));
                const initializedPlayers: Player[] = playersConfig.map(playerBase => ({
                    ...playerBase,
                    isPlaying: true,
                    duelsWon: 0,
                    timeBoostsUsed: 0
                }))
                setAllPlayers(initializedPlayers)
                const firstPlayer = initializedPlayers[Math.floor(Math.random() * playersConfig.length)];
                setActiveMapPlayer(firstPlayer);
            })
        }
    }, [gameState]);

    const conquerTerritory = useCallback((winnerPlayer: Player, loserPlayer: Player, inheritedCategory: string) => {
        const newGrid = grid.map((row) =>
            row.map((cell) => {
                if (cell.ownerName === loserPlayer.name) {
                    return {...cell, ownerName: winnerPlayer.name};
                }
                return cell;
            }),
        );
        setGrid(newGrid);

        const updatedLoserPlayer = {
            ...loserPlayer,
            isPlaying: false
        }
        const updatedWinnerPlayer = {
            ...winnerPlayer,
            category: inheritedCategory,
            duelsWon: winnerPlayer.duelsWon + 1
        }
        const stillPlayingPlayers = allPlayers.filter(player => player.isPlaying)
        const newAllPlayers: Player[] = allPlayers
            .map(player => {
                if (player.name === updatedLoserPlayer.name) {
                    return updatedLoserPlayer
                } else if (player.name == updatedWinnerPlayer.name)
                    return updatedWinnerPlayer
                else {
                    return player
                }
            })
        ;
        setAllPlayers(newAllPlayers);
        setActiveMapPlayer(updatedWinnerPlayer);
        setHasWonPreviousDuel(true); // TODO: rethink

        const newPlayerMap = new Map(positionToPlayer);
        const position = stillPlayingPlayers.length;
        newPlayerMap.set(position, updatedLoserPlayer);
        if (stillPlayingPlayers.length === 2) {
            newPlayerMap.set(1, updatedWinnerPlayer);
        }
        console.log(newPlayerMap) // TODO: remove
        setPositionToPlayer(newPlayerMap);
    }, [grid, allPlayers, positionToPlayer]);

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
        },
    };
};
