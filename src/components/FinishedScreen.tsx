import {Box, Button, Typography} from '@mui/material';

type FinishedScreenProps = {
    winner: 1 | 2 | null;
    onPlayAgain: () => void;
};

export const FinishedScreen = ({winner, onPlayAgain}: FinishedScreenProps) => {
    return (
        <Box>
            <Typography variant="h3" color="primary" gutterBottom>
                Player {winner} won!
            </Typography>
            <Typography variant="h5" color="textSecondary" gutterBottom>
                Congratulations!
            </Typography>
            <Button variant="contained" size="large" onClick={onPlayAgain} sx={{mt: 2}}>
                Play Again?
            </Button>
        </Box>
    );
};
