import {useCallback, useEffect, useState} from 'react';
import type {GameGrid, GameState, GridCell, MapState, Player} from '../types';
import {initializeGrid} from '../components/grid/gridUtils.ts';

interface GameMapStateResult {
    mapState: MapState;
    actions: {
        conquerTerritory: (winnerPlayer: Player, loserPlayer: Player) => void;
        handleCellClick: (cell: GridCell) => void;
        prepareDuel: (challengerPlayer: Player, defenderPlayer: Player) => void;
    };
}

export const useGameMapState = (
    gameState: GameState,
    allPlayers: Player[],
    startDuelCallback: (challenger: Player, defender: Player) => void,
): GameMapStateResult => {
    const [grid, setGrid] = useState<GameGrid>([]);
    const [activeMapPlayer, setActiveMapPlayer] = useState<Player | null>(null);

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

    const prepareDuel = useCallback((challengerPlayer: Player, defenderPlayer: Player) => {
        // Wszystkie kroki przygotowania przenosimy do funkcji wyżej,
        // aby GameContext mógł też zresetować stan Duelu.
        startDuelCallback(challengerPlayer, defenderPlayer);
    }, [startDuelCallback]);


    // KLIKNIĘCIE NA KOMÓRKĘ
    const handleCellClick = useCallback((cell: GridCell) => {
        if (gameState !== 'map' || !activeMapPlayer) return;

        if (!cell.ownerId || cell.ownerId === activeMapPlayer.id) {
            console.log('Kliknij pole przeciwnika!');
            return;
        }

        const currentChallenger = allPlayers.find((p) => p.id === activeMapPlayer.id);
        const currentDefender = allPlayers.find((p) => p.id === cell.ownerId);

        if (currentChallenger && currentDefender) {
            prepareDuel(currentChallenger, currentDefender);
        }
    }, [gameState, activeMapPlayer, allPlayers, prepareDuel]);


    // Zwracamy pogrupowany stan i akcje
    const mapState: MapState = {
        grid,
        allPlayers,
        activeMapPlayer,
    };

    return {
        mapState,
        actions: {
            conquerTerritory,
            handleCellClick,
            prepareDuel,
        },
    };
};
