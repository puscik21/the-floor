import React from 'react';
import {Box, styled} from '@mui/material';
import {useGameContext} from '../../context/GameContext.tsx';
import type {Player} from '../../types.ts';
import PlayerCell from './PlayerCell.tsx';

const PlayerGrid = () => {
    const {grid, allPlayers} = useGameContext().map;
    const playerMap = React.useMemo(() => {
        const map = new Map<string, Player>();
        allPlayers.forEach((player) => {
            map.set(player.name, player);
        });
        return map;
    }, [allPlayers]);

    const numRows = grid.length;
    if (numRows === 0) return null;
    const numCols = grid[0]?.length || 0;
    if (numCols === 0) return null;

    const nextAnimationDelay = Math.max(120, 1500 / allPlayers.length);
    return (
        <GridContainer numCols={numCols} numRows={numRows}>
            {grid.flat().map((cell, index) => {
                const owner = cell.ownerName
                    ? playerMap.get(cell.ownerName) ?? null
                    : null;

                return (
                    <AnimatedCellWrapper
                        key={`${cell.x}-${cell.y}`}
                        style={{animationDelay: `${index * nextAnimationDelay}ms`}}
                    >
                        <PlayerCell cell={cell} owner={owner}/>
                    </AnimatedCellWrapper>
                );
            })}
        </GridContainer>
    );
};

export default PlayerGrid;

const GridContainer = styled(Box, {
    shouldForwardProp: (prop) => prop !== 'numCols' && prop !== 'numRows',
})<{ numCols: number; numRows: number }>`
    display: grid;

    /* minmax to make sure the Cell is never smaller then content */
    grid-template-columns: repeat(${props => props.numCols}, minmax(0, 1fr));
    grid-template-rows: repeat(${props => props.numRows}, minmax(0, 1fr));
    grid-auto-flow: row; // TODO: can be removed?
    overflow: hidden; /* Dont let cells to overflow outside the parent container */

    width: 80vw;
    height: 80vh;

    gap: 8px;
    padding: 16px;
    margin-top: 20px;

    background: linear-gradient(180deg, #050b2e, #0a1a4f),
    repeating-linear-gradient(
            90deg,
            rgba(0, 140, 255, 0.08) 0px,
            rgba(0, 140, 255, 0.08) 1px,
            transparent 1px,
            transparent 40px
    );

    border-radius: 20px;
    border: 2px solid rgba(0, 160, 255, 0.35);
    box-shadow: 0 0 40px rgba(0, 120, 255, 0.35), inset 0 0 30px rgba(0, 60, 180, 0.45);
`;

const AnimatedCellWrapper = styled(Box)`
    animation: tileEnter 400ms ease-out forwards;
    opacity: 0;
    transform: scale(0.1);

    @keyframes tileEnter {
        to {
            opacity: 1;
            transform: scale(1);
        }
    }
`;
