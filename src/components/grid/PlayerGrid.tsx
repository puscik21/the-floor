import React from 'react';
import {Box, styled, Typography} from '@mui/material';
import {useGameContext} from '../../context/GameContext.tsx';
import type {Player} from '../../types.ts';

const PlayerGrid = () => {
    const {grid, allPlayers, activeMapPlayer, handleCellClick} = useGameContext();

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
                const isActive = owner?.id === activeMapPlayer?.id;

                return (
                    <Cell
                        key={`${cell.x}-${cell.y}`}
                        isOwned={!!owner}
                        isActive={isActive}
                        style={{backgroundColor: owner ? owner.color : '#333'}}
                        onClick={() => handleCellClick(cell)}
                    >
                        <Typography variant="h4" fontWeight="bold">
                            {owner ? owner.name : ''}
                        </Typography>
                        <Typography variant="h5" color="textSecondary">
                            {owner ? `(${owner.category})` : ''}
                        </Typography>
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
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
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
