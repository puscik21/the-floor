import { Box, Button, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useGameContext } from '../context/GameContext.tsx';

// --- Wrapper zajmujący cały ekran i centrowanie ---
const FullscreenCenter = styled(Box)`
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;   // poziomo
    align-items: center;       // pionowo
    background: #000;          // żeby nie było białych marginesów
`;

// --- Główny kontener ekranu zwycięstwa ---
const StyledWrapper = styled(Box)`
    background: radial-gradient(circle at top, #222 0%, #0f0f0f 70%);
    color: #ffffff;
    padding: 60px 40px;
    border-radius: 16px;
    text-align: center;
    box-shadow: 0 0 25px rgba(0,0,0,0.7), inset 0 0 30px rgba(255,255,255,0.03);
    max-width: 700px;
    width: 90%;
    margin: 0 auto;
`;

// --- Przyciski ---
const RestartButton = styled(Button)`
    background: linear-gradient(180deg, #17a2ff, #0a84c9);
    color: white;
    padding: 16px 40px;
    font-size: 1.2rem;
    font-weight: 900;
    border-radius: 12px;
    margin-top: 40px;
    box-shadow: 0 8px 25px rgba(23,162,255,0.4);
    transition: 0.25s;

    &:hover {
        background: linear-gradient(180deg, #1bb9ff, #0a84c9);
        transform: translateY(-3px) scale(1.03);
        box-shadow: 0 12px 30px rgba(23,162,255,0.55);
    }
`;

const FinishedScreen = () => {
    const {
        general: { winner },
        actions: { handleReturnToMap },
    } = useGameContext();

    if (!winner) {
        handleReturnToMap();
        return null;
    }

    return (
        <FullscreenCenter>
            <StyledWrapper>
                <Typography
                    variant="h3"
                    sx={{
                        fontWeight: 800,
                        mb: 2,
                        textShadow: '0 0 15px rgba(255,255,255,0.25)',
                        letterSpacing: '1px'
                    }}
                >
                          <span style={{ color: 'inherit' }}>
                            {winner.name}
                          </span>{' '}
                    wygrał!
                </Typography>

                <Typography
                    variant="h5"
                    sx={{
                        color: '#bfbfbf',
                        mb: 4,
                        fontWeight: 400,
                        letterSpacing: '0.5px'
                    }}
                >
                    Gratulacje, Floor Master!
                </Typography>

                <RestartButton onClick={handleReturnToMap}>
                    Kolejna runda?
                </RestartButton>
            </StyledWrapper>
        </FullscreenCenter>
    );
};

export default FinishedScreen;
