import {Box, styled, Typography} from '@mui/material';
import type {GridCell, Player} from '../../types.ts';
import {useGameContext} from '../../context/GameContext.tsx';

interface PlayerCellProps {
    cell: GridCell;
    owner: Player | null;
}

const PlayerCell = ({cell, owner}: PlayerCellProps) => {
    const {activeMapPlayer, handleCellClick} = useGameContext();
    const isActive = owner?.id === activeMapPlayer?.id;

    return (
        <Cell
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
};

export default PlayerCell;

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
