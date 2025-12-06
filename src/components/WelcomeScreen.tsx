import { Box, Button, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

import { useGameContext } from '../context/GameContext.tsx';
import { motion } from 'framer-motion';

// --- ZASOBY WIZUALNE ---

// Poprawka ESLint/TS6333: Ponieważ 'theme' nie było używane wewnątrz tej funkcji,
// usuwamy argument 'theme', aby nie generował błędu "never used".
const TileBackground = () => ` 
    /* Tło imitujące kafelki w ciemnym niebieskim */
    background: radial-gradient(circle at center, #001f3f 0%, #000814 100%);
    background-image: linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
    background-size: 50px 50px;
    box-shadow: inset 0 0 100px rgba(0, 0, 0, 0.5); 
`;

// --- STYLIZOWANE KOMPONENTY ---

// Składnia z funkcją strzałkową pozwala na użycie theme.
const WelcomeContainer = styled(Box)(({ theme }) => `
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: white;
    text-align: center;
    padding: ${theme.spacing(2)};
    ${TileBackground()} // <--- Wywołujemy bez argumentu theme
`);

const TitleContainer = styled(motion.div)(({ theme }) => `
    padding: 10px 20px;
    margin-bottom: ${theme.spacing(3)};
    display: flex;
    flex-direction: column;
    align-items: center;

    /* Poprawiony styl złotej ramki */
    border: 5px solid #FFC700;
    border-radius: 6px;
    background-color: rgba(0, 15, 30, 0.5);
    box-shadow: 
        0 0 5px rgba(255, 215, 0, 0.8) inset,
        0 0 25px rgba(255, 165, 0, 0.8),
        0 0 50px rgba(0, 0, 0, 0.7);
`);

const TitleTextBase = styled(Typography)`
    font-weight: 900;
    letter-spacing: 2px;
    /* Efekt złotego, metalicznego tekstu */
    background: linear-gradient(180deg, #FFD700 0%, #FFA500 40%, #D4AF37 80%, #FFD700 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    text-shadow: 0 4px 6px rgba(0, 0, 0, 0.3), 
                 0 0 10px rgba(255, 215, 0, 0.5);
`;

// Usuwamy .attrs i ustawiamy style bezpośrednio
const TitleTop = styled(TitleTextBase)`
    /* THE */
    font-size: 1.8rem;
    margin-bottom: -10px;
`;

// Usuwamy .attrs i ustawiamy style bezpośrednio
const TitleBottom = styled(TitleTextBase)`
    /* FLOOR */
    font-size: 4rem;
    padding-top: 5px;
`;


const SubtitleText = styled(Typography)(({ theme }) => `
    margin-top: ${theme.spacing(3)};
    color: rgba(255, 255, 255, 0.8);
`);

const StartButton = styled(Button)(({ theme }) => `
    margin-top: ${theme.spacing(4)};
    padding: ${theme.spacing(1.5, 4)};
    font-size: 1.2rem;
    font-weight: bold;
    border-radius: 12px;
    background: linear-gradient(90deg, #007bff, #00b4d8);
    box-shadow: 0 0 20px rgba(0, 150, 255, 0.6);

    &:hover {
        background: linear-gradient(90deg, #0096ff, #00d4ff);
        box-shadow: 0 0 25px rgba(0, 150, 255, 0.9);
    }
`);

// --- GŁÓWNY KOMPONENT ---

const WelcomeScreen = () => {
    const handleStartGame = useGameContext().actions.handleStartGame;

    return (
        <WelcomeContainer>
            <TitleContainer
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                {/* Variant h4 i h2 są ustawione bezpośrednio jako propsy */}
                <TitleTop variant="h4">
                    THE
                </TitleTop>
                <TitleBottom variant="h2">
                    FLOOR
                </TitleBottom>
            </TitleContainer>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 1 }}
            >
                <SubtitleText variant="h5">
                    Step onto the arena. Will you survive?
                </SubtitleText>
            </motion.div>

            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 1.4, duration: 0.5 }}
            >
                <StartButton
                    variant="contained"
                    size="large"
                    onClick={handleStartGame}
                >
                    Start Game
                </StartButton>
            </motion.div>
        </WelcomeContainer>
    );
};

export default WelcomeScreen;