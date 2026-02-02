import {Box, Button, Typography} from '@mui/material';
import {keyframes, styled} from '@mui/material/styles';
import {useGameContext} from "../../../context/GameContext.tsx";
import ConfettiOverlay from "../../../utils/confetti/ConfettiOverlay.tsx";

const FinishedDuelScreen = () => {
    const {
        general: {winner},
        actions: {handleReturnToMap},
    } = useGameContext();

    if (!winner) {
        handleReturnToMap()
        return null;
    }

    return (
        <FullscreenCenter>
            <ConfettiOverlay duration={3000} initialBurst={40} zIndex={50}/>
            <StyledWrapper>
                <Typography
                    variant="h3"
                    sx={{
                        fontWeight: 800,
                        mb: 1,
                        textShadow: '0 0 12px rgba(255,255,255,0.08)',
                        letterSpacing: '0.6px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 1,
                    }}
                >
                    <Trophy aria-hidden>🏆</Trophy>
                    <WinnerName>{winner.name}</WinnerName>
                    <span style={{color: '#d0d0d0', marginLeft: 8, fontWeight: 600}}>wygrał!</span>
                </Typography>

                <Typography
                    variant="h5"
                    sx={{
                        color: '#bfbfbf',
                        mb: 3,
                        fontWeight: 400,
                        letterSpacing: '0.4px',
                    }}
                >
                    Gratulacje, Floor Master!
                </Typography>

                <RestartButton onClick={handleReturnToMap}>Kolejna runda?</RestartButton>
            </StyledWrapper>
        </FullscreenCenter>
    );
};

export default FinishedDuelScreen;

/* -------------------------
   Animations (keyframes)
   ------------------------- */
const enter = keyframes`
    0% {
        transform: scale(0.95);
        opacity: 0;
    }
    60% {
        transform: scale(1.02);
        opacity: 1;
    }
    100% {
        transform: scale(1);
        opacity: 1;
    }
`;

const pulseGlow = (c = '#17a2ff') => keyframes`
    0% {
        text-shadow: 0 0 8px ${c}66, 0 0 20px ${c}33;
        transform: translateY(0);
    }
    50% {
        text-shadow: 0 0 18px ${c}cc, 0 0 42px ${c}66;
        transform: translateY(-4px);
    }
    100% {
        text-shadow: 0 0 8px ${c}66, 0 0 20px ${c}33;
        transform: translateY(0);
    }
`;

const bounce = keyframes`
    0% {
        transform: translateY(0) scale(1);
    }
    30% {
        transform: translateY(-10px) scale(1.06);
    }
    50% {
        transform: translateY(0) scale(1);
    }
    100% {
        transform: translateY(0) scale(1);
    }
`;

/* -------------------------
   Styled components
   ------------------------- */
const FullscreenCenter = styled(Box)`
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: linear-gradient(180deg, #060606 0%, #000 100%);
`;

const StyledWrapper = styled(Box)(() => ({
    background: 'radial-gradient(circle at top, #181818 0%, #0b0b0b 70%)',
    color: '#ffffff',
    padding: '48px 36px',
    borderRadius: 16,
    textAlign: 'center',
    boxShadow: '0 0 40px rgba(0,0,0,0.7), inset 0 0 30px rgba(255,255,255,0.02)',
    maxWidth: 720,
    width: '92%',
    margin: '0 auto',
    animation: `${enter} 520ms cubic-bezier(.2,.8,.2,1) both`,
}));

const WinnerName = styled('span')<{ color?: string }>(({color = '#17a2ff'}) => ({
    color: '#fff',
    display: 'inline-block',
    padding: '0 6px',
    borderRadius: 6,
    background: 'linear-gradient(90deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01))',
    animation: `${pulseGlow(color)} 2000ms ease-in-out infinite`,
    boxShadow: `0 6px 18px ${color}22, 0 0 10px ${color}11 inset`,
}));

const Trophy = styled('span')(() => ({
    display: 'inline-block',
    marginRight: 10,
    fontSize: 34,
    lineHeight: 1,
    transformOrigin: '50% 50%',
    animation: `${bounce} 1400ms ease-in-out infinite`,
    '@media (max-width: 420px)': {
        fontSize: 28,
    },
}));

const RestartButton = styled(Button)`
    background: linear-gradient(180deg, #17a2ff, #0a84c9);
    color: white;
    padding: 14px 36px;
    font-size: 1.05rem;
    font-weight: 800;
    border-radius: 12px;
    margin-top: 34px;
    box-shadow: 0 10px 30px rgba(23, 162, 255, 0.28);
    transition: transform 0.22s, box-shadow 0.22s;

    &:hover {
        transform: translateY(-3px) scale(1.02);
        box-shadow: 0 14px 38px rgba(23, 162, 255, 0.44);
    }
`;
