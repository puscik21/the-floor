import {Box, styled, Typography} from '@mui/material';
import type {GridCell, Player} from '../../types.ts';
import {useGameContext} from '../../context/GameContext.tsx';

interface PlayerCellProps {
    cell: GridCell;
    owner: Player | null;
}

const PlayerCell = ({cell, owner}: PlayerCellProps) => {
    const {
        map: {activeMapPlayer},
        actions: {handleCellClick},
    } = useGameContext();

    const isActive = owner?.name === activeMapPlayer?.name;

    return (
        <Cell
            isOwned={!!owner}
            isActive={isActive}
            onClick={() => handleCellClick(cell)}
        >
            <Typography
                variant="h5"
                sx={{
                    fontWeight: 900,
                    color: 'white',
                    textTransform: 'uppercase',
                    textShadow: owner ? '0 0 4px rgba(0, 160, 255, 0.7), 0 0 8px rgba(0, 0, 0, 0.5)' : 'none',
                    lineHeight: 1.1,
                }}
            >
                {owner ? owner.name : ''}
            </Typography>

            <Typography
                variant="body1"
                sx={{
                    color: 'rgba(255,255,255,0.6)',
                    mt: 0.8,
                    fontWeight: 700,
                    fontSize: '1rem',
                    textTransform: 'uppercase',
                    textShadow: owner ? '0 0 3px rgba(0, 0, 0, 0.9)' : 'none',
                }}
            >
                {owner ? owner.category : ''}
            </Typography>
        </Cell>
    );
};

export default PlayerCell;

const Cell = styled(Box, {
    shouldForwardProp: (prop) => prop !== 'isOwned' && prop !== 'isActive',
})<{ isOwned: boolean; isActive: boolean }>`
    aspect-ratio: 1 / 1;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: ${({isOwned}) => (isOwned ? 'pointer' : 'default')};
    transition: transform 0.12s ease, box-shadow 0.3s ease, border 0.3s ease;

    background: radial-gradient(circle, rgba(0, 160, 255, 0.18), transparent 80%), linear-gradient(180deg, #0a1133, #050922);
    box-shadow: inset 0 0 12px rgba(0, 40, 110, 0.6);

    border: 2px solid rgba(255, 255, 255, 0.06);
    z-index: ${({isActive}) => (isActive ? 10 : 1)};

    &:hover {
        // white glow for inactive cells
        ${({isOwned, isActive}) => isOwned && !isActive && `
             box-shadow: 
                 0 0 10px #ffffff, 
                 0 0 20px #ffffff,
                 inset 0 0 15px rgba(255, 255, 255, 0.4); 
             border: 4px solid #ffffff; 
        `}
    }

    // blue glow for active player cells
    ${({isActive}) => isActive && `
        border: 4px solid #17a2ff;
        box-shadow: 
            0 0 15px #17a2ff,
            0 0 30px #17a2ff,
            inset 0 0 20px #17a2ff;
    `}

    padding: 6px;
    text-align: center;
`;
