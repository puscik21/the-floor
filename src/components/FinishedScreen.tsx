import {Box, Button, Typography} from '@mui/material';
import type {Player} from './grid/types.ts';

type FinishedScreenProps = {
    winner: Player;
    onPlayAgain: () => void;
};

export const FinishedScreen = ({winner, onPlayAgain}: FinishedScreenProps) => {
    return (
        <Box>
            <Typography variant="h3" gutterBottom>
                <span style={{color: winner.color}}>{winner.name}</span> wygrał!
            </Typography>
            <Typography variant="h5" color="textSecondary" gutterBottom>
                Gratulacja!
            </Typography>
            <Button variant="contained" size="large" onClick={onPlayAgain} sx={{mt: 2}}>
                Kolejna runda?
            </Button>
        </Box>
    );
};
