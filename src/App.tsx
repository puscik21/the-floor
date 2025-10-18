import {useEffect, useState} from 'react'
import './App.css'

function App() {
    const INIT_TIME_SECONDS = 5;
    const PASS_PENALTY_SECONDS = 2;
    type GameState = 'idle' | 'running' | 'finished'

    const [playerTimer1, setPlayerTimer1] = useState(INIT_TIME_SECONDS)
    const [playerTimer2, setPlayerTimer2] = useState(INIT_TIME_SECONDS)
    const [activePlayer, setActivePlayer] = useState<1 | 2>(1)
    const [winner, setWinner] = useState<1 | 2 | null>(null)
    const [gameState, setGameState] = useState<GameState>('idle')

    useEffect(() => {
        if (gameState !== 'running') {
            return
        }

        const intervalId = setInterval(() => {
            if (activePlayer === 1) {
                setPlayerTimer1(prev => prev - 1)
            } else {
                setPlayerTimer2(prev => prev - 1)
            }
        }, 1000)

        return () => clearInterval(intervalId)
    }, [activePlayer, gameState]);

    useEffect(() => {
        if (playerTimer1 <= 0) {
            setWinner(2)
            setGameState('finished')
        }
        if (playerTimer2 <= 0) {
            setWinner(1)
            setGameState('finished')
        }
    }, [playerTimer1, playerTimer2]);

    const handleCorrectAnswer = () => {
        setActivePlayer(activePlayer === 1 ? 2 : 1)
    }

    const handleStartGame = () => {
        setPlayerTimer1(INIT_TIME_SECONDS)
        setPlayerTimer2(INIT_TIME_SECONDS)
        setActivePlayer(1)
        setWinner(null)
        setGameState('running')
    }

    return (
        <>
            {gameState === 'idle' && (
                <>
                    <h1>Welcome to The Floor!</h1>
                    <button onClick={handleStartGame}>Start Game</button>
                </>
            )}
            {gameState === 'running' && (
                <>
                    <h1>{playerTimer1}</h1>
                    <h1>{playerTimer2}</h1>
                    <button onClick={handleCorrectAnswer}>Correct answer!</button>
                </>
            )}
                {gameState === 'finished' && (
                    <div>
                        <h1>Player {winner} won!</h1>
                        <button onClick={handleStartGame}>Next rund?</button>
                    </div>
                )}
        </>
    )
}

export default App
