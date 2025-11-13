import {useEffect, useState} from 'react';
import {Container, CssBaseline, ThemeProvider} from '@mui/material';
import {darkTheme} from './theme/theme';

import {WelcomeScreen} from './components/WelcomeScreen';
import {GameScreen} from './components/gamescreen/GameScreen';
import {FinishedScreen} from './components/FinishedScreen';
import type {GameGrid, GridCell, Player} from './components/grid/types.ts';
import {PlayerGrid} from './components/grid/PlayerGrid.tsx';
import {initializeGrid} from './components/grid/gridUtils.ts';

const INIT_TIME_SECONDS = 3;
const PASS_PENALTY_SECONDS = 3;

type GameState = 'idle' | 'map' | 'running' | 'finished';

const MOCK_PLAYERS: Player[] = [
    {id: 'p1', name: 'Anna', color: '#E53935'},
    {id: 'p2', name: 'Bartek', color: '#1E88E5'},
    {id: 'p3', name: 'Celina', color: '#43A047'},
    {id: 'p4', name: 'Daniel', color: '#FDD835'},
    {id: 'p5', name: 'Ewa', color: '#8E24AA'},
    {id: 'p6', name: 'Filip', color: '#00897B'},
];

function App() {
    const [gameState, setGameState] = useState<GameState>('idle');

    const [playerTimer1, setPlayerTimer1] = useState(INIT_TIME_SECONDS);
    const [playerTimer2, setPlayerTimer2] = useState(INIT_TIME_SECONDS);
    const [passTimer, setPassTimer] = useState(PASS_PENALTY_SECONDS);
    const [activePlayer, setActivePlayer] = useState<1 | 2>(1); // TODO: 1 = Challenger, 2 = Defender
    const [winner, setWinner] = useState<1 | 2 | null>(null); // TODO: 1 = Challenger, 2 = Defender
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
            if (activePlayer === 1) setPlayerTimer1((prev) => prev - 1);
            else setPlayerTimer2((prev) => prev - 1);
            if (isPassPenaltyActive) setPassTimer((prev) => prev - 1);
        }, 1000);
        return () => clearInterval(intervalId);
    }, [activePlayer, gameState, isPassPenaltyActive]);

    // TODO: Probably add useCallback hook
    const conquerTerritory = (winnerPlayer: Player, loserPlayer: Player) => {
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
    };

    useEffect(() => {
        if (gameState !== 'running') return;

        if (isPassPenaltyActive && passTimer <= 0) {
            setIsPassPenaltyActive(false);
            setPassTimer(PASS_PENALTY_SECONDS);
        }

        if (!challenger || !defender) return;

        if (playerTimer1 <= 0) {
            setWinner(2);
            setGameState('finished');
            conquerTerritory(defender, challenger);
        }
        if (playerTimer2 <= 0) {
            setWinner(1);
            setGameState('finished');
            conquerTerritory(challenger, defender);
        }
    }, [passTimer, playerTimer1, playerTimer2, isPassPenaltyActive, gameState, challenger, defender, conquerTerritory]);

    const handleCorrectAnswer = () => setActivePlayer(activePlayer === 1 ? 2 : 1);
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

        setPlayerTimer1(INIT_TIME_SECONDS);
        setPlayerTimer2(INIT_TIME_SECONDS);
        setPassTimer(PASS_PENALTY_SECONDS);
        setActivePlayer(1); // Challenger goes first
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
                        playerTimer1={playerTimer1}
                        playerTimer2={playerTimer2}
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
            case 'finished':
                return <FinishedScreen winner={winner} onPlayAgain={handleReturnToMap}/>;
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
