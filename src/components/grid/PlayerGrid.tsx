import React from 'react';
import {Box, styled} from '@mui/material';
import type {Player} from './types.ts';
import {useGameContext} from '../../context/GameContext.tsx';

const PlayerGrid = () => {
    const {grid, allPlayers, activeMapPlayerId, handleCellClick} = useGameContext();

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
                const owner = cell.ownerId ? playerMap.get(cell.ownerId) : null;
                const isActive = owner?.id === activeMapPlayerId;

                return (
                    <Cell
                        key={`${cell.x}-${cell.y}`}
                        isOwned={!!owner}
                        isActive={isActive}
                        style={{backgroundColor: owner ? owner.color : '#333'}}
                        onClick={() => handleCellClick(cell)}
                    >
                        {owner ? owner.name : ''}
                    </Cell>
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
    // aspectRatio: `${numCols} / ${numRows}`, // TODO: Other possibility
    height: '90vw',
    maxHeight: '800px',

    border: '6px solid #333',
    backgroundColor: '#111',
    gap: '3px', // TODO: Maybe 0px soon?
    margin: '20px auto',
}));

const Cell = styled(Box, {
    shouldForwardProp: (prop) => prop !== 'isOwned' && prop !== 'isActive',
})<{ isOwned: boolean; isActive: boolean }>(({theme, isOwned, isActive}) => ({
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontWeight: 'bold',
    fontSize: '1.2rem', // TODO: Maybe size depends on the cell's size?
    cursor: isOwned ? 'pointer' : 'default',
    transition: 'transform 0.1s ease, border 0.2s ease',
    backgroundColor: '#333',

    border: isActive ? `8px solid ${theme.palette.primary.main}` : 'none',
    zIndex: isActive ? 10 : 1,

    '&:hover': {
        transform: isOwned ? 'scale(1.05)' : 'none',
        zIndex: 11,
    },
}));
