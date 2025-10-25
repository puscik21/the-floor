import {useEffect, useState} from 'react';
import {Container, CssBaseline, ThemeProvider} from '@mui/material';
import {darkTheme} from './theme/theme';

import {WelcomeScreen} from './components/WelcomeScreen';
import {GameScreen} from './components/GameScreen';
import {FinishedScreen} from './components/FinishedScreen';

function App() {
    const INIT_TIME_SECONDS = 150;
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
            if (activePlayer === 1) setPlayerTimer1(prev => prev - 1);
            else setPlayerTimer2(prev => prev - 1);
            if (isPassPenaltyActive) setPassTimer(prev => prev - 1);
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

    const handleCorrectAnswer = () => setActivePlayer(activePlayer === 1 ? 2 : 1);

    const handlePass = () => setIsPassPenaltyActive(true);

    const handleStartGame = () => {
        setPlayerTimer1(INIT_TIME_SECONDS);
        setPlayerTimer2(INIT_TIME_SECONDS);
        setPassTimer(PASS_PENALTY_SECONDS);
        setActivePlayer(1);
        setWinner(null);
        setIsPassPenaltyActive(false);
        setGameState('running');
    };

    const renderContent = () => {
        switch (gameState) {
            case 'running':
                return (
                    <GameScreen
                        playerTimer1={playerTimer1}
                        playerTimer2={playerTimer2}
                        activePlayer={activePlayer}
                        passTimer={passTimer}
                        isPassPenaltyActive={isPassPenaltyActive}
                        onCorrectAnswer={handleCorrectAnswer}
                        onPass={handlePass}
                        questionImageUrl="https://przepisna.pl/wp-content/uploads/marchewka-wartosci-odzywcze.jpeg"
                    />
                );
            case 'finished':
                return <FinishedScreen winner={winner} onPlayAgain={handleStartGame}/>;
            case 'idle':
            default:
                return <WelcomeScreen onStartGame={handleStartGame}/>;
        }
    };

    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline/>
            <Container maxWidth={false} disableGutters sx={{textAlign: 'center'}}>
                {renderContent()}
            </Container>
        </ThemeProvider>
    );
}

export default App;

