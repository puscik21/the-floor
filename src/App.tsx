import {useCallback, useEffect, useState} from 'react';
import {Container, CssBaseline, ThemeProvider} from '@mui/material';
import {darkTheme} from './theme/theme';

import {WelcomeScreen} from './components/WelcomeScreen';
import {GameScreen} from './components/gamescreen/GameScreen';
import {FinishedScreen} from './components/FinishedScreen';
import type {GameGrid, GridCell, Player} from './components/grid/types.ts';
import {PlayerGrid} from './components/grid/PlayerGrid.tsx';
import {initializeGrid, MOCK_PLAYERS} from './components/grid/gridUtils.ts';
import type {DuelPlayer} from './types.ts';

const INIT_TIME_SECONDS = 30;
const PASS_PENALTY_SECONDS = 3;

type GameState = 'idle' | 'map' | 'running' | 'finished';

function App() {
    const [gameState, setGameState] = useState<GameState>('idle');
    const [challengerTimer, setChallengerTimer] = useState(INIT_TIME_SECONDS);
    const [defenderTimer, setDefenderTimer] = useState(INIT_TIME_SECONDS);
    const [passTimer, setPassTimer] = useState(PASS_PENALTY_SECONDS);
    const [activePlayer, setActivePlayer] = useState<DuelPlayer>('challenger');
    const [winner, setWinner] = useState<Player | null>(null);
    const [isPassPenaltyActive, setIsPassPenaltyActive] = useState(false);

    const [allPlayers] = useState<Player[]>(MOCK_PLAYERS);
    const [grid, setGrid] = useState<GameGrid>([]);
    const [activeMapPlayerId, setActiveMapPlayerId] = useState<string | null>(null);
    const [challenger, setChallenger] = useState<Player | null>(null);
    const [defender, setDefender] = useState<Player | null>(null);

    useEffect(() => {
        if (gameState === 'idle') {
            setGrid(initializeGrid(allPlayers));
            const firstPlayer = allPlayers[Math.floor(Math.random() * allPlayers.length)];
            setActiveMapPlayerId(firstPlayer.id);
        }
    }, [gameState, allPlayers]);

    useEffect(() => {
        if (gameState !== 'running') return;
        const intervalId = setInterval(() => {
            if (activePlayer === 'challenger') setChallengerTimer((prev) => prev - 1);
            else setDefenderTimer((prev) => prev - 1);

            if (isPassPenaltyActive) setPassTimer((prev) => prev - 1);
        }, 1000);
        return () => clearInterval(intervalId);
    }, [activePlayer, gameState, isPassPenaltyActive]);

    // useCallback() as we use it in useEffect
    const conquerTerritory = useCallback((winnerPlayer: Player, loserPlayer: Player) => {
        const newGrid = grid.map((row) =>
            row.map((cell) => {
                if (cell.ownerId === loserPlayer.id) {
                    return {...cell, ownerId: winnerPlayer.id};
                }
                return cell;
            }),
        );
        setGrid(newGrid);
        setActiveMapPlayerId(winnerPlayer.id);
    }, [grid]);

    useEffect(() => {
        if (gameState !== 'running') return;

        if (isPassPenaltyActive && passTimer <= 0) {
            setIsPassPenaltyActive(false);
            setPassTimer(PASS_PENALTY_SECONDS);
        }

        if (!challenger || !defender) return;

        if (challengerTimer <= 0) {
            setWinner(defender);
            setGameState('finished');
            conquerTerritory(defender, challenger);
        }
        if (defenderTimer <= 0) {
            setWinner(challenger);
            setGameState('finished');
            conquerTerritory(challenger, defender);
        }
    }, [passTimer, challengerTimer, defenderTimer, isPassPenaltyActive, gameState, challenger, defender, conquerTerritory]);

    const handleCorrectAnswer = () => setActivePlayer(activePlayer === 'challenger' ? 'defender' : 'challenger');
    const handlePass = () => setIsPassPenaltyActive(true);

    const handleStartGame = () => {
        setGameState('map');
    };

    const handleStartDuel = (
        challengerPlayer: Player,
        defenderPlayer: Player,
    ) => {
        setChallenger(challengerPlayer);
        setDefender(defenderPlayer);

        setChallengerTimer(INIT_TIME_SECONDS);
        setDefenderTimer(INIT_TIME_SECONDS);
        setPassTimer(PASS_PENALTY_SECONDS);
        setActivePlayer('challenger');
        setWinner(null);
        setIsPassPenaltyActive(false);
        setGameState('running');
    };

    const handleReturnToMap = () => {
        setChallenger(null);
        setDefender(null);
        setGameState('map');
    };

    const handleCellClick = (cell: GridCell) => {
        if (gameState !== 'map' || !activeMapPlayerId) return;

        if (!cell.ownerId || cell.ownerId === activeMapPlayerId) {
            console.log('Click a cell of another player!');
            return;
        }

        const currentChallenger = allPlayers.find((p) => p.id === activeMapPlayerId);
        const currentDefender = allPlayers.find((p) => p.id === cell.ownerId);

        if (currentChallenger && currentDefender) {
            handleStartDuel(currentChallenger, currentDefender);
        }
    };

    const renderContent = () => {
        switch (gameState) {
            case 'running':
                return (
                    <GameScreen
                        challengerTimer={challengerTimer}
                        defenderTimer={defenderTimer}
                        activePlayer={activePlayer}
                        passTimer={passTimer}
                        isPassPenaltyActive={isPassPenaltyActive}
                        onCorrectAnswer={handleCorrectAnswer}
                        onPass={handlePass}
                        questionImageUrl="https://przepisna.pl/wp-content/uploads/marchewka-wartosci-odzywcze.jpeg"
                        questionTitle="What is this?"
                        challengerName={challenger?.name || 'Gracz 1'}
                        defenderName={defender?.name || 'Gracz 2'}
                    />
                );
            case 'finished': {
                if (!winner) {
                    handleReturnToMap();
                    return null;
                }
                return <FinishedScreen winner={winner} onPlayAgain={handleReturnToMap}/>;
            }
            case 'map': {
                const activePlayer = allPlayers.find(p => p.id === activeMapPlayerId);
                return (
                    <>
                        <h1 style={{color: 'white'}}>THE FLOOR</h1>
                        <h3 style={{color: 'white'}}>
                            Ruch gracza: <span style={{color: activePlayer?.color}}>{activePlayer?.name}</span>
                        </h3>
                        <PlayerGrid
                            grid={grid}
                            players={allPlayers}
                            activePlayerId={activeMapPlayerId}
                            onCellClick={handleCellClick}
                        />
                    </>
                );
            }
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
