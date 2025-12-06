import {useCallback, useEffect, useState} from 'react';
import type {GameGrid, GameState, GridCell, MapState, Player} from '../types';
import {initializeGrid} from '../components/grid/gridUtils.ts';
import playersConfig from '../../public/players.json';

interface GameMapStateResult {
    mapState: MapState;
    actions: {
        conquerTerritory: (winnerPlayer: Player, loserPlayer: Player) => void;
        handleCellClick: (cell: GridCell) => void;
    };
}

export const useGameMapState = (
    gameState: GameState,
    startDuelCallback: (challenger: Player, defender: Player) => void,
): GameMapStateResult => {
    const [grid, setGrid] = useState<GameGrid>([]);
    const [activeMapPlayer, setActiveMapPlayer] = useState<Player | null>(null);

    const allPlayers: Player[] = playersConfig;

    useEffect(() => {
        if (gameState === 'init') {
            setGrid(initializeGrid(allPlayers));
            const firstPlayer = allPlayers[Math.floor(Math.random() * allPlayers.length)];
            setActiveMapPlayer(firstPlayer);
        }
    }, [gameState, allPlayers]);

    const conquerTerritory = useCallback((winnerPlayer: Player, loserPlayer: Player) => {
        const newGrid = grid.map((row) =>
            row.map((cell) => {
                if (cell.ownerId === loserPlayer.id) {
                    return {...cell, ownerId: winnerPlayer.id};
                }
                return cell;
            }),
        );
        setGrid(newGrid);
        setActiveMapPlayer(winnerPlayer);
    }, [grid]);

    const findPlayerById = useCallback((id: string): Player | undefined => {
        return allPlayers.find((p) => p.id === id)
    }, [allPlayers]);

    const handleCellClick = useCallback((cell: GridCell) => {
        if (gameState !== 'map' || !activeMapPlayer) return;

        if (!cell.ownerId || cell.ownerId === activeMapPlayer.id) {
            console.log('Kliknij pole przeciwnika!');
            return;
        }

        const currentChallenger = findPlayerById(activeMapPlayer.id)
        const currentDefender = findPlayerById(cell.ownerId)

        if (currentChallenger && currentDefender) {
            startDuelCallback(currentChallenger, currentDefender);
        }
    }, [gameState, activeMapPlayer, findPlayerById, startDuelCallback]);

    const mapState: MapState = {
        grid,
        allPlayers,
        activeMapPlayer,
    };

    // TODO: simplify
    return {
        mapState,
        actions: {
            conquerTerritory,
            handleCellClick,
        },
    };
};
