import {motion} from "framer-motion";
import {styled} from "@mui/material/styles";
import {Button} from "@mui/material";
import {useGameContext} from "../../context/GameContext.tsx";

const StartGameButton = () => {
    const handleStartGame = useGameContext().actions.handleStartGame;

    return (
        <motion.div
            initial={{scale: 0.8, opacity: 0}}
            animate={{scale: 1, opacity: 1}}
            transition={{delay: 1.4, duration: 0.8}}
        >
            <StartButton
                variant="contained"
                size="large"
                onClick={handleStartGame}
            >
                Rozpocznij
            </StartButton>
        </motion.div>
    )
}

export default StartGameButton;

const StartButton = styled(Button)`
    margin-top: 32px;
    padding: 12px 32px;
    font-size: 1.2rem;
    font-weight: bold;
    border-radius: 12px;
    background: linear-gradient(90deg, #007bff, #00b4d8);
    box-shadow: 0 0 20px rgba(0, 150, 255, 0.6);

    &:hover {
        background: linear-gradient(90deg, #0096ff, #00d4ff);
        box-shadow: 0 0 25px rgba(0, 150, 255, 0.9);
    }

    && {
        color: white;
    }
`;
