import {Box, Button, Typography} from '@mui/material';

type WelcomeScreenProps = {
    onStartGame: () => void;
};

export const WelcomeScreen = ({onStartGame}: WelcomeScreenProps) => {
    return (
        <Box>
            <Typography variant="h2" component="h1" gutterBottom>
                Welcome to The Floor!
            </Typography>
            <Typography variant="h5" color="textSecondary" gutterBottom>
                Press Start to begin
            </Typography>
            <Button variant="contained" size="large" onClick={onStartGame} sx={{mt: 2}}>
                Start Game
            </Button>
        </Box>
    );
};
