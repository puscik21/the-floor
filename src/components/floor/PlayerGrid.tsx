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

    if (grid.length === 0) return null;

    return (
        <GridContainer>
            {grid.flat().map((cell, index) => {
                const owner = cell.ownerName
                    ? playerMap.get(cell.ownerName) ?? null
                    : null;

                return (
                    <AnimatedCellWrapper
                        key={`${cell.x}-${cell.y}`}
                        style={{ animationDelay: `${index * 40}ms` }}
                    >
                        <PlayerCell cell={cell} owner={owner} />
                    </AnimatedCellWrapper>
                );
            })}
        </GridContainer>
    );
};

export default PlayerGrid;

/* ---------------- styled ---------------- */

const GridContainer = styled(Box)`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
    gap: 10px;


    width: min(92vw, 1100px);

    padding: 16px;
    margin: 24px auto;

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

    box-shadow: 0 0 40px rgba(0, 120, 255, 0.35),
    inset 0 0 30px rgba(0, 60, 180, 0.45);
`;

const AnimatedCellWrapper = styled(Box)`
    animation: tileEnter 420ms ease-out forwards;
    opacity: 0;
    transform: scale(0.85);

    @keyframes tileEnter {
        to {
            opacity: 1;
            transform: scale(1);
        }
    }
`;
