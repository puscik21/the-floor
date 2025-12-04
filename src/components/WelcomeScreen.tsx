import { Box, Button, Typography} from '@mui/material';
import { useGameContext } from '../context/GameContext.tsx';
import { motion } from 'framer-motion';

const WelcomeScreen = () => {
    const handleStartGame = useGameContext().actions.handleStartGame;

    return (
        <Box
            sx={{
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'radial-gradient(circle at center, #001f3f, #000814)',
                color: 'white',
                textAlign: 'center',
                padding: 2
            }}
        >
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                <Typography
                    variant="h2"
                    sx={{
                        fontWeight: 'bold',
                        letterSpacing: '2px',
                        textShadow: '0 0 15px rgba(0, 150, 255, 0.8)',
                    }}
                >
                    THE FLOOR
                </Typography>
            </motion.div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 1 }}
            >
                <Typography
                    variant="h5"
                    sx={{ mt: 2, color: 'rgba(255,255,255,0.8)' }}
                >
                    Step onto the arena. Will you survive?
                </Typography>
            </motion.div>

            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 1.4, duration: 0.5 }}
            >
                <Button
                    variant="contained"
                    size="large"
                    onClick={handleStartGame}
                    sx={{
                        mt: 4,
                        paddingX: 4,
                        paddingY: 1.5,
                        fontSize: '1.2rem',
                        fontWeight: 'bold',
                        borderRadius: '12px',
                        background:
                            'linear-gradient(90deg, #007BFF, #00B4D8)',
                        boxShadow: '0 0 20px rgba(0,150,255,0.6)',
                        '&:hover': {
                            background:
                                'linear-gradient(90deg, #0096FF, #00D4FF)',
                            boxShadow: '0 0 25px rgba(0,150,255,0.9)',
                        }
                    }}
                >
                    Start Game
                </Button>
            </motion.div>
        </Box>
    );
};

export default WelcomeScreen;
