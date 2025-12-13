import {useCallback, useEffect, useState} from 'react';
import type {GameGrid, GameState, GridCell, MapState, Player} from '../types';
import {initializeGrid} from '../components/floor/gridUtils.ts';
import playersConfig from '../../public/players.json';

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
            setAllPlayers(playersConfig)
            setGrid(initializeGrid(playersConfig));
            const firstPlayer = playersConfig[Math.floor(Math.random() * playersConfig.length)];
            setActiveMapPlayer(firstPlayer);
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

        const position = allPlayers.length;
        const newAllPlayers = allPlayers
            .filter(p => p.name !== loserPlayer.name)
            .map(player =>
                player.name == winnerPlayer.name
                    ? {...player, category: inheritedCategory}
                    : player,
            );
        setAllPlayers(newAllPlayers);
        setActiveMapPlayer(winnerPlayer);
        setHasWonPreviousDuel(true);

        const newPlayerMap = new Map(positionToPlayer);
        newPlayerMap.set(position, loserPlayer);
        if (allPlayers.length === 2) {
            newPlayerMap.set(1, winnerPlayer);
        }
        setPositionToPlayer(newPlayerMap);
    }, [grid, allPlayers, positionToPlayer]);

    const findPlayerByName = useCallback((name: string): Player | undefined => {
        return allPlayers.find((p) => p.name === name)
    }, [allPlayers]);

    const handleCellClick = useCallback((cell: GridCell) => {
        if (gameState !== 'floor' || !activeMapPlayer) return;

        if (!cell.ownerName || cell.ownerName === activeMapPlayer.name) {
            console.log('Kliknij pole przeciwnika!');
            return;
        }

        const currentChallenger = findPlayerByName(activeMapPlayer.name)
        const currentDefender = findPlayerByName(cell.ownerName)

        if (currentChallenger && currentDefender) {
            startDuelCallback(currentChallenger, currentDefender);
        }
    }, [gameState, activeMapPlayer, findPlayerByName, startDuelCallback]);

    const handlePassFloorClick = useCallback(() => {
        const potentialNextPlayers: Player[] = allPlayers.filter(p => p.name !== activeMapPlayer?.name)
        if (potentialNextPlayers.length === 0) {
            console.log('Brak innych graczy do wylosowania');
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
        positionToPlayer
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
