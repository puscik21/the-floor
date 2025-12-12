import React from 'react';
import {Box, Button, styled} from '@mui/material';
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

    return (
        <>
            <GridContainer numCols={numCols} numRows={numRows}>
                {grid.flat().map((cell) => {
                    const owner: Player | null = cell.ownerName ? (playerMap.get(cell.ownerName) ?? null) : null;

                    return (
                        <PlayerCell
                            key={`${cell.x}-${cell.y}`}
                            cell={cell}
                            owner={owner}
                        />
                    );
                })}
            </GridContainer>
            <PassButton>Pas</PassButton>
        </>
    );
};

export default PlayerGrid;

const GridContainer = styled(Box, {
    shouldForwardProp: (prop) => prop !== 'numCols' && prop !== 'numRows',
})<{ numCols: number; numRows: number }>`
    display: grid;

    grid-template-columns: repeat(${({numCols}) => numCols}, 1fr);
    grid-template-rows: repeat(${({numRows}) => numRows}, 1fr);

    width: 90vw;
    max-width: 800px;
    height: 90vw;
    max-height: 800px;

    border: 6px solid #333;
    background-color: #111;
    gap: 3px; // TODO: Maybe 0px soon?
    margin: 20px auto;
`;

const PassButton = styled(Button)`
    background: linear-gradient(180deg, #17a2ff, #0a84c9);
    color: white;
    padding: 14px 36px;
    font-size: 1.05rem;
    font-weight: 800;
    border-radius: 12px;
    margin-top: 34px;
    box-shadow: 0 10px 30px rgba(23, 162, 255, 0.28);
    transition: transform 0.22s, box-shadow 0.22s;

    &:hover {
        //transform: translateY(-3px) scale(1.02);
        box-shadow: 0 14px 38px rgba(23, 162, 255, 0.44);
    }
`;
