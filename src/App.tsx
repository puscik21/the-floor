import {useEffect, useState} from 'react'
import './App.css'


function App() {
    const TIME_SECONDS = 5;

    const [isRunning, setIsRunning] = useState(false)
    const [isGameFinished, setIsGameFinished] = useState(false)
    const [activePlayer, setActivePlayer] = useState(1)
    const [playerTimer1, setPlayerTimer1] = useState(TIME_SECONDS)
    const [playerTimer2, setPlayerTimer2] = useState(TIME_SECONDS)

    function checkAndFinishGame(previousTime: number): number {
        if (previousTime <= 1) {
            setIsRunning(false)
            setIsGameFinished(true)
            setPlayerTimer1(TIME_SECONDS)
            setPlayerTimer2(TIME_SECONDS)
            return 0
        }
        return previousTime - 1
    }

    useEffect(() => {
        if (isRunning) {
            const intervalId: NodeJS.Timeout = setInterval(() => {
                if (activePlayer === 1) {
                    setPlayerTimer1(previousTime => checkAndFinishGame(previousTime))
                } else {
                    setPlayerTimer2(previousTime => checkAndFinishGame(previousTime))
                }
            }, 1000)

            return () => {
                if (intervalId) {
                    clearInterval(intervalId)
                }
            }
        }
    }, [activePlayer, isRunning]);

    const setNextActivePlayer = () => {
        const currentPlayer = getNextActivePlayer()
        console.log(currentPlayer)
        setActivePlayer(currentPlayer);
    }

    const getNextActivePlayer = (): number => 1 + (activePlayer % 2)

    const startGame = () => {
        setIsGameFinished(false)
        setIsRunning(true)
    }

    return (
        <>
            {isGameFinished ?
                <h1>Player {getNextActivePlayer()} won!</h1>
                :
                <>
                    <h1>{playerTimer1}</h1>
                    <h1>{playerTimer2}</h1>
                </>
            }
            {!isRunning ?
                <button onClick={startGame}>Start game =)</button>
                :
                <button onClick={setNextActivePlayer}>Correct answer!</button>
            }

        </>
    )
}

export default App
