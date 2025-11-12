import React from 'react';
import { Box, styled } from '@mui/material';
import type {GameGrid, GridCell, Player} from './types.ts';


interface PlayerGridProps {
    grid: GameGrid;
    players: Player[];
    activePlayerId: string | null;
    onCellClick: (cell: GridCell) => void;
}

export const PlayerGrid: React.FC<PlayerGridProps> = ({
                                                          grid,
                                                          players,
                                                          activePlayerId,
                                                          onCellClick,
                                                      }) => {
    const playerMap = React.useMemo(() => {
        const map = new Map<string, Player>();
        players.forEach((player) => {
            map.set(player.id, player);
        });
        return map;
    }, [players]);

    const numRows = grid.length;
    const numCols = grid[0]?.length || 0;

    if (numRows === 0) return null;

    return (
        <GridContainer numCols={numCols} numRows={numRows}>
            {grid.flat().map((cell) => {
                const owner = cell.ownerId ? playerMap.get(cell.ownerId) : null;
                const isActive = owner?.id === activePlayerId;

                return (
                    <Cell
                        key={`${cell.x}-${cell.y}`}
                        isOwned={!!owner}
                        isActive={isActive}
                        style={{ backgroundColor: owner ? owner.color : '#333' }}
                        onClick={() => onCellClick(cell)}
                    >
                        {owner ? owner.name.toUpperCase() : ''}
                    </Cell>
                );
            })}
        </GridContainer>
    );
};

const GridContainer = styled(Box, {
    shouldForwardProp: (prop) => prop !== 'numCols' && prop !== 'numRows',
})<{ numCols: number; numRows: number }>(({numCols, numRows }) => ({
    display: 'grid',
    gridTemplateColumns: `repeat(${numCols}, 1fr)`,
    gridTemplateRows: `repeat(${numRows}, 2fr)`,
    width: '90vw',
    height: '90vw',
    maxWidth: '800px',
    maxHeight: '800px',
    border: '4px solid #fff',
    backgroundColor: '#111',
    gap: '3px',
    margin: '20px auto',
}));

const Cell = styled(Box, {
    shouldForwardProp: (prop) => prop !== 'isOwned' && prop !== 'isActive',
})<{ isOwned: boolean; isActive: boolean }>(({ theme, isOwned, isActive }) => ({
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontWeight: 'bold',
    fontSize: '0.9rem',
    cursor: isOwned ? 'pointer' : 'default',
    transition: 'transform 0.1s ease, border 0.2s ease',
    backgroundColor: '#333',

    border: isActive ? `3px solid ${theme.palette.primary.main}` : 'none',
    zIndex: isActive ? 10 : 1,

    '&:hover': {
        transform: isOwned ? 'scale(1.1)' : 'none',
        zIndex: 11,
    },
}));
