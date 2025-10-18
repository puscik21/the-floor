import {useEffect, useState} from 'react';

import {
    Box,
    Button,
    Card,
    CardContent,
    Container,
    CssBaseline,
    Grid,
    Stack,
    ThemeProvider,
    Typography,
} from '@mui/material';
import {darkTheme} from './theme/theme.ts';

function App() {
    const INIT_TIME_SECONDS = 15;
    const PASS_PENALTY_SECONDS = 3;
    type GameState = 'idle' | 'running' | 'finished';

    const [playerTimer1, setPlayerTimer1] = useState(INIT_TIME_SECONDS);
    const [playerTimer2, setPlayerTimer2] = useState(INIT_TIME_SECONDS);
    const [passTimer, setPassTimer] = useState(PASS_PENALTY_SECONDS);
    const [activePlayer, setActivePlayer] = useState<1 | 2>(1);
    const [winner, setWinner] = useState<1 | 2 | null>(null);
    const [gameState, setGameState] = useState<GameState>('idle');
    const [isPassPenaltyActive, setIsPassPenaltyActive] = useState(false);

    useEffect(() => {
        if (gameState !== 'running') {
            return;
        }
        const intervalId = setInterval(() => {
            if (activePlayer === 1) {
                setPlayerTimer1(prev => prev - 1);
            } else {
                setPlayerTimer2(prev => prev - 1);
            }
            if (isPassPenaltyActive) {
                setPassTimer(prev => prev - 1);
            }
        }, 1000);
        return () => clearInterval(intervalId);
    }, [activePlayer, gameState, isPassPenaltyActive]);

    useEffect(() => {
        if (isPassPenaltyActive && passTimer <= 0) {
            setIsPassPenaltyActive(false);
            setPassTimer(PASS_PENALTY_SECONDS);
        }
        if (playerTimer1 <= 0) {
            setWinner(2);
            setGameState('finished');
        }
        if (playerTimer2 <= 0) {
            setWinner(1);
            setGameState('finished');
        }
    }, [passTimer, playerTimer1, playerTimer2, isPassPenaltyActive]);

    const handleCorrectAnswer = () => {
        setActivePlayer(activePlayer === 1 ? 2 : 1);
    };
    const handlePass = () => {
        setIsPassPenaltyActive(true);
    };
    const handleStartGame = () => {
        setPlayerTimer1(INIT_TIME_SECONDS);
        setPlayerTimer2(INIT_TIME_SECONDS);
        setPassTimer(PASS_PENALTY_SECONDS);
        setActivePlayer(1);
        setWinner(null);
        setIsPassPenaltyActive(false);
        setGameState('running');
    };

    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline/>
            <Container maxWidth="sm" sx={{textAlign: 'center', mt: 4}}>
                {gameState === 'idle' && (
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
                )}

                {gameState === 'running' && (
                    <Stack spacing={3}>
                        <Grid container spacing={3}>
                            <Grid item xs={6}>
                                <Card sx={{border: activePlayer === 1 ? 2 : 0, borderColor: 'primary.main'}}>
                                    <CardContent>
                                        <Typography variant="h6">Player 1</Typography>
                                        <Typography variant="h2" component="div">{playerTimer1}</Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item xs={6}>
                                <Card sx={{border: activePlayer === 2 ? 2 : 0, borderColor: 'primary.main'}}>
                                    <CardContent>
                                        <Typography variant="h6">Player 2</Typography>
                                        <Typography variant="h2" component="div">{playerTimer2}</Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grid>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Button
                                    variant="contained"
                                    fullWidth
                                    onClick={handleCorrectAnswer}
                                    disabled={isPassPenaltyActive}
                                >
                                    {isPassPenaltyActive ? `Wait... (${passTimer}s)` : 'Correct answer!'}
                                </Button>
                            </Grid>
                            <Grid item xs={12}>
                                <Button
                                    variant="outlined"
                                    fullWidth
                                    onClick={handlePass}
                                    disabled={isPassPenaltyActive}
                                >
                                    Pass
                                </Button>
                            </Grid>
                        </Grid>
                    </Stack>
                )}

                {gameState === 'finished' && (
                    <Box>
                        <Typography variant="h3" color="primary" gutterBottom>
                            Player {winner} won!
                        </Typography>
                        <Typography variant="h5" color="textSecondary" gutterBottom>
                            Congratulations!
                        </Typography>
                        <Button variant="contained" size="large" onClick={handleStartGame} sx={{mt: 2}}>
                            Play Again?
                        </Button>
                    </Box>
                )}
            </Container>
        </ThemeProvider>
    );
}

export default App;
