import {Box, Button, Typography} from '@mui/material';
import {useGameContext} from '../context/GameContext.tsx';

const WelcomeScreen = () => {
    const handleStartGame = useGameContext().actions.handleStartGame;

    return (
        <Box>
            <Typography variant="h2" component="h1" gutterBottom>
                Welcome to The Floor!
            </Typography>
            <Typography variant="h5" color="textSecondary" gutterBottom>
                Press Start to begin
            </Typography>
            <Button variant="contained" size="large" onClick={handleStartGame} sx={{mt: 2}}>
                Start Game
            </Button>
        </Box>
    );
};

export default WelcomeScreen
