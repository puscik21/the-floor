import {useCallback, useEffect, useState} from 'react';
import type {GameGrid, GameState, GridCell, MapState, Player} from '../types';
import {initializeGrid} from '../components/grid/gridUtils.ts';
import playersConfig from '../../public/players.json';

interface GameMapStateResult {
    mapState: MapState;
    actions: {
        conquerTerritory: (winnerPlayer: Player, loserPlayer: Player, inheritedCategory: string) => void;
        handleCellClick: (cell: GridCell) => void;
    };
}

export const useGameMapState = (
    gameState: GameState,
    startDuelCallback: (challenger: Player, defender: Player) => void,
): GameMapStateResult => {
    const [grid, setGrid] = useState<GameGrid>([]);
    const [activeMapPlayer, setActiveMapPlayer] = useState<Player | null>(null);
    const [allPlayers, setAllPlayers] = useState<Player[]>([]);

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

        setAllPlayers(allPlayers.map(player =>
            player.name == winnerPlayer.name
                ? {...player, category: inheritedCategory}
                : player,
        ))
        setActiveMapPlayer(winnerPlayer);
    }, [grid, allPlayers]);

    const findPlayerByName = useCallback((name: string): Player | undefined => {
        return allPlayers.find((p) => p.name === name)
    }, [allPlayers]);

    const handleCellClick = useCallback((cell: GridCell) => {
        if (gameState !== 'map' || !activeMapPlayer) return;

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
        },
    };
};
