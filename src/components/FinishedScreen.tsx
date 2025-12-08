import {Box, Button, Typography} from '@mui/material';
import {styled} from '@mui/material/styles'; // Importujemy 'styled'
import {useGameContext} from '../context/GameContext.tsx';

// 1. Stylowany kontener dla całego ekranu
const StyledBox = styled(Box)`
    background-color: #1a1a1a; // Ciemne tło
    color: #ffffff; // Biały tekst
    padding: 40px;
    border-radius: 12px;
    text-align: center;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5); // Głęboki cień
`;

// 2. Stylowany przycisk z gradientem (jak w ActionsSection)
// Używamy <any> lub <ButtonProps> w zależności od konfiguracji,
// ale po naprawie json możemy użyć <ButtonProps> lub usunąć typowanie dla prostoty.
const RestartButton = styled(Button)`
    background: linear-gradient(180deg, #17a2ff, #0a84c9); // Niebieski gradient
    color: white;
    padding: 12px 30px;
    height: 60px;
    font-size: 1.1rem;
    font-weight: 800;
    margin-top: ${({theme}) => theme.spacing(3)};
    transition: transform 0.2s;
    box-shadow: 0 6px 15px rgba(0,0,0,0.4);
    
    &:hover {
        transform: translateY(-2px);
        background: linear-gradient(180deg, #17a2ff, #0a84c9); // Zapobieganie zmianie gradientu
        box-shadow: 0 8px 20px rgba(0,0,0,0.5);
    }
`;


const FinishedScreen = () => {
    const {general: {winner}, actions: {handleReturnToMap}} = useGameContext();
    if (!winner) {
        handleReturnToMap();
        return null;
    }

    return (
        <StyledBox> {/* Używamy stylowanego Boxa */}
            <Typography
                variant="h3"
                gutterBottom
                sx={{
                    fontWeight: 700,
                    mb: 3,
                    textShadow: '0 0 10px rgba(255, 255, 255, 0.1)'
                }}
            >
                <span style={{color: winner.color}}>{winner.name}</span> wygrał!
            </Typography>

            <Typography variant="h5" sx={{color: '#aaa', mb: 3}}>
                Gratulacje!
            </Typography>

            <RestartButton
                variant="contained"
                size="large"
                onClick={handleReturnToMap}
            >
                Kolejna runda?
            </RestartButton>
        </StyledBox>
    );
};

export default FinishedScreen;