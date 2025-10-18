import {useEffect, useState} from 'react'
import './App.css'

function App() {
    // const [isRunning, setIsRunning] = useState(false)
    const [activePlayer, setActivePlayer] = useState(1)
    const [playerTimer1, setPlayerTimer1] = useState(5)
    const [playerTimer2, setPlayerTimer2] = useState(5)

    useEffect(() => {
        const intervalId: NodeJS.Timeout = setInterval(() => {
            if (activePlayer === 1) {
                setPlayerTimer1(previousTime => previousTime - 1)
            } else {
                setPlayerTimer2(previousTime => previousTime - 1)
            }
        }, 1000)

        return () => {
            if (intervalId) {
                clearInterval(intervalId)
            }
        }
    }, [activePlayer]);

    const setCurrentActivePlayer = () => {
        const currentPlayer = 1 + (activePlayer % 2)
        console.log(currentPlayer)
        setActivePlayer(currentPlayer);
    }

    return (
        <>
            <h1>{playerTimer1}</h1>
            <h1>{playerTimer2}</h1>
            <button onClick={setCurrentActivePlayer}>Correct answer!</button>
        </>
    )
}

export default App
