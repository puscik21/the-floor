import {useEffect, useState} from 'react';
import {Container, CssBaseline, ThemeProvider} from '@mui/material';
import {darkTheme} from './theme/theme';

import {WelcomeScreen} from './components/WelcomeScreen';
import {GameScreen} from './components/gamescreen/GameScreen';
import {FinishedScreen} from './components/FinishedScreen';
import type {GameGrid, Player} from './components/grid/types.ts';
import {PlayerGrid} from './components/grid/PlayerGrid.tsx';

const INIT_TIME_SECONDS = 150;
const PASS_PENALTY_SECONDS = 3;
const GRID_SIZE = 10;

const MOCK_PLAYERS: Player[] = [
    {id: 'p1', name: 'Anna', color: '#E53935'},
    {id: 'p2', name: 'Bartek', color: '#1E88E5'},
    {id: 'p3', name: 'Celina', color: '#43A047'},
    {id: 'p4', name: 'Daniel', color: '#FDD835'},
    {id: 'p5', name: 'Ewa', color: '#8E24AA'},
    {id: 'p6', name: 'Filip', color: '#00897B'},
];

function initializeGrid(players: Player[]): GameGrid {
    const grid: GameGrid = Array(GRID_SIZE)
        .fill(null)
        .map((_, y) =>
            Array(GRID_SIZE)
                .fill(null)
                .map((_, x) => ({x, y, ownerId: null})),
        );
    const availableCells: { x: number; y: number }[] = [];
    for (let y = 0; y < GRID_SIZE; y++) {
        for (let x = 0; x < GRID_SIZE; x++) {
            availableCells.push({x, y});
        }
    }
    for (let i = availableCells.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [availableCells[i], availableCells[j]] = [
            availableCells[j],
            availableCells[i],
        ];
    }
    players.forEach((player, index) => {
        if (index < availableCells.length) {
            const cellCoords = availableCells[index];
            grid[cellCoords.y][cellCoords.x].ownerId = player.id;
        }
    });
    return grid;
}

// --- GŁÓWNY KOMPONENT APP ---

function App() {
    // Rozszerzamy GameState o 'map'
    type GameState = 'idle' | 'map' | 'running' | 'finished';
    const [gameState, setGameState] = useState<GameState>('idle');

    // Stany dla pojedynku (bez zmian)
    const [playerTimer1, setPlayerTimer1] = useState(INIT_TIME_SECONDS);
    const [playerTimer2, setPlayerTimer2] = useState(INIT_TIME_SECONDS);
    const [passTimer, setPassTimer] = useState(PASS_PENALTY_SECONDS);
    const [activePlayer, setActivePlayer] = useState<1 | 2>(1); // 1 = Challenger, 2 = Defender
    const [winner, setWinner] = useState<1 | 2 | null>(null);
    const [isPassPenaltyActive, setIsPassPenaltyActive] = useState(false);

    // NOWE STANY: Zarządzanie całą grą
    const [allPlayers] = useState<Player[]>(MOCK_PLAYERS);
    const [grid, setGrid] = useState<GameGrid>([]);
    const [activeMapPlayerId, setActiveMapPlayerId] = useState<string | null>(null); // Kto wybiera na mapie
    const [challenger, setChallenger] = useState<Player | null>(null);
    const [defender, setDefender] = useState<Player | null>(null);

    // Inicjalizacja siatki i wybór pierwszego gracza
    useEffect(() => {
        if (gameState === 'idle') {
            const initialGrid = initializeGrid(allPlayers);
            setGrid(initialGrid);
            // Losowy gracz zaczyna
            const firstPlayer = allPlayers[Math.floor(Math.random() * allPlayers.length)];
            setActiveMapPlayerId(firstPlayer.id);
        }
    }, [gameState, allPlayers]);

    // Główny timer pojedynku (bez zmian)
    useEffect(() => {
        if (gameState !== 'running') return;
        const intervalId = setInterval(() => {
            if (activePlayer === 1) setPlayerTimer1((prev) => prev - 1);
            else setPlayerTimer2((prev) => prev - 1);
            if (isPassPenaltyActive) setPassTimer((prev) => prev - 1);
        }, 1000);
        return () => clearInterval(intervalId);
    }, [activePlayer, gameState, isPassPenaltyActive]);

    // Logika przejęcia terytorium
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
        // Zwycięzca staje się aktywnym graczem na mapie
        setActiveMapPlayerId(winnerPlayer.id);
    };

    // Logika końca pojedynku (ZAKTUALIZOWANA)
    useEffect(() => {
        if (gameState !== 'running') return;

        if (isPassPenaltyActive && passTimer <= 0) {
            setIsPassPenaltyActive(false);
            setPassTimer(PASS_PENALTY_SECONDS);
        }

        // Sprawdzamy, czy mamy uczestników pojedynku
        if (!challenger || !defender) return;

        if (playerTimer1 <= 0) {
            setWinner(2); // Wygrywa Defender (Gracz 2)
            setGameState('finished');
            conquerTerritory(defender, challenger); // Przejęcie terytorium
        }
        if (playerTimer2 <= 0) {
            setWinner(1); // Wygrywa Challenger (Gracz 1)
            setGameState('finished');
            conquerTerritory(challenger, defender); // Przejęcie terytorium
        }
    }, [
        passTimer,
        playerTimer1,
        playerTimer2,
        isPassPenaltyActive,
        gameState,
        challenger,
        defender,
    ]);

    // Handlery pojedynku (bez zmian)
    const handleCorrectAnswer = () => setActivePlayer(activePlayer === 1 ? 2 : 1);
    const handlePass = () => setIsPassPenaltyActive(true);

    // Start gry (przechodzi do mapy)
    const handleStartGame = () => {
        setGameState('map');
    };

    // Nowa funkcja: Start pojedynku (wywoływana z mapy)
    const handleStartDuel = (
        challengerPlayer: Player,
        defenderPlayer: Player,
    ) => {
        setChallenger(challengerPlayer);
        setDefender(defenderPlayer);

        // Reset timerów pojedynku
        setPlayerTimer1(INIT_TIME_SECONDS);
        setPlayerTimer2(INIT_TIME_SECONDS);
        setPassTimer(PASS_PENALTY_SECONDS);
        setActivePlayer(1); // Challenger (Gracz 1) zawsze zaczyna
        setWinner(null);
        setIsPassPenaltyActive(false);

        setGameState('running'); // Przełącz na ekran pojedynku
    };

    // Powrót do mapy po ekranie "Finished"
    const handleReturnToMap = () => {
        // Resetujemy uczestników pojedynku
        setChallenger(null);
        setDefender(null);
        setGameState('map');
    };

    // Kliknięcie na komórkę mapy
    const handleCellClick = (cell: GridCell) => {
        if (gameState !== 'map' || !activeMapPlayerId) return;

        // Nie można kliknąć pustego pola ani swojego
        if (!cell.ownerId || cell.ownerId === activeMapPlayerId) {
            console.log('Kliknij pole przeciwnika!');
            return;
        }

        // Mamy wyzwanie!
        const currentChallenger = allPlayers.find((p) => p.id === activeMapPlayerId);
        const currentDefender = allPlayers.find((p) => p.id === cell.ownerId);

        if (currentChallenger && currentDefender) {
            handleStartDuel(currentChallenger, currentDefender);
        }
    };

    // Renderowanie zawartości
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
                        // Przekazujemy nazwy graczy do GameScreen
                        challengerName={challenger?.name || 'Gracz 1'}
                        defenderName={defender?.name || 'Gracz 2'}
                    />
                );
            case 'finished':
                return <FinishedScreen winner={winner} onPlayAgain={handleReturnToMap}/>;
            case 'map':
                { const activePlayer = allPlayers.find(p => p.id === activeMapPlayerId);
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
                ); }
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
