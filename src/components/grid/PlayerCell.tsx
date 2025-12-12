import { Box, Typography, styled } from '@mui/material'; // Usunięto 'keyframes'
import type { GridCell, Player } from '../../types.ts';
import { useGameContext } from '../../context/GameContext.tsx';

interface PlayerCellProps {
    cell: GridCell;
    owner: Player | null;
}

const PlayerCell = ({ cell, owner }: PlayerCellProps) => {
    const {
        map: { activeMapPlayer },
        actions: { handleCellClick },
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

/* --- Styl kafelka --- */
const Cell = styled(Box, {
    shouldForwardProp: (prop) => prop !== 'isOwned' && prop !== 'isActive',
})<{ isOwned: boolean; isActive: boolean }>`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: ${({ isOwned }) => (isOwned ? 'pointer' : 'default')};
    transition: transform 0.12s ease, box-shadow 0.3s ease, border 0.3s ease;

    background-color: #0a1133;
    box-shadow: inset 0 0 12px rgba(0, 40, 110, 0.6);

    border: 2px solid rgba(255,255,255,0.06);
    z-index: ${({ isActive }) => (isActive ? 10 : 1)};

    // STYL DLA AKTYWNEGO KAWAŁKA (STAŁY NIEBIESKI BLASK)
    ${({ isActive }) => isActive && `
        border: 4px solid #17a2ff;
        box-shadow: 
            0 0 15px #17a2ff,
            0 0 30px #17a2ff,
            inset 0 0 20px #17a2ff;
    `}

    &:hover {
        transform: ${({ isOwned }) => (isOwned ? 'scale(1.03)' : 'none')};
        z-index: 11;

        // BIAŁY BLASK DLA NIEAKTYWNYCH KAFELKÓW
        ${({ isOwned, isActive }) => isOwned && !isActive && `
             box-shadow: 
                 0 0 10px #ffffff, 
                 0 0 20px #ffffff,
                 inset 0 0 15px rgba(255, 255, 255, 0.4); 
             border: 4px solid #ffffff; 
        `}

                // WZMOCNIONY NIEBIESKI BLASK DLA AKTYWNEGO KAFELKA
        ${({ isActive }) => isActive && `
            box-shadow: 
                0 0 15px #2fb8ff, 
                0 0 30px #2fb8ff,
                inset 0 0 25px #2fb8ff;
            border: 4px solid #2fb8ff;
        `}
    }

    padding: 6px;
    text-align: center;
`;
