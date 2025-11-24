import React from 'react';
import {Box, styled} from '@mui/material';
import {useGameContext} from '../../context/GameContext.tsx';
import type {Player} from '../../types.ts';
import PlayerCell from './PlayerCell.tsx';

const PlayerGrid = () => {
    const {grid, allPlayers} = useGameContext();
    const playerMap = React.useMemo(() => {
        const map = new Map<string, Player>();
        allPlayers.forEach((player) => {
            map.set(player.id, player);
        });
        return map;
    }, [allPlayers]);

    const numRows = grid.length;
    if (numRows === 0) return null;
    const numCols = grid[0]?.length || 0;
    if (numCols === 0) return null;

    return (
        <GridContainer numCols={numCols} numRows={numRows}>
            {grid.flat().map((cell) => {
                const owner: Player | null = cell.ownerId ? (playerMap.get(cell.ownerId) ?? null) : null;

                return (
                    <PlayerCell
                        key={`${cell.x}-${cell.y}`}
                        cell={cell}
                        owner={owner}
                    />
                );
            })}
        </GridContainer>
    );
};

export default PlayerGrid;

const GridContainer = styled(Box, {
    shouldForwardProp: (prop) => prop !== 'numCols' && prop !== 'numRows',
})<{ numCols: number; numRows: number }>(({numCols, numRows}) => ({
    display: 'grid',
    gridTemplateColumns: `repeat(${numCols}, 1fr)`,
    gridTemplateRows: `repeat(${numRows}, 1fr)`,

    width: '90vw',
    maxWidth: '800px',
    height: '90vw',
    maxHeight: '800px',

    border: '6px solid #333',
    backgroundColor: '#111',
    gap: '3px', // TODO: Maybe 0px soon?
    margin: '20px auto',
}));
