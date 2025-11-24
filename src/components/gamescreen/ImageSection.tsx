import {Box, Button, Typography} from '@mui/material';
import {styled} from '@mui/material/styles';
import {useGameContext} from '../../context/GameContext.tsx';

const ImageSection = () => {
    const {gameState, questionImageUrl, questionTitle, handleStartDuel} = useGameContext();

    if (gameState === 'ready') {
        return (
            <Container>
                <StartButton onClick={handleStartDuel} variant="contained" color="primary">
                    <Typography variant="h4" sx={{fontWeight: 'bold'}}>
                        ROZPOCZNIJ GRĘ
                    </Typography>
                </StartButton>
            </Container>
        );
    }

    else if (gameState === 'duel') {
        return (
            <Container>
                {questionImageUrl ? (
                    <StyledImg
                        src={questionImageUrl}
                        alt={questionTitle}
                    />
                ) : (
                    <ImagePlaceholder>
                        <Typography variant="subtitle1" sx={{opacity: 0.7}}>
                            (Tu pojawi się zdjęcie do pytania)
                        </Typography>
                    </ImagePlaceholder>
                )}
            </Container>
        );
    } else {
        return null;
    }
};

export default ImageSection;

const StartButton = styled(Button)`
    width: 80%;
    height: 80%;
    max-width: 600px;
    background-color: ${({theme}) => theme.palette.primary.main};
    color: ${({theme}) => theme.palette.primary.contrastText};
    border-radius: ${({theme}) => (theme.shape.borderRadius as number) * 2}px;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.5);
    transition: transform 0.2s;

    &:hover {
        transform: scale(1.02);
        background-color: ${({theme}) => theme.palette.primary.dark};
    }
`;

const Container = styled('section')`
    max-width: min(1800px, 95vw);
    margin: 0 auto;
    width: 100%;
    display: grid;
    place-items: center;
    overflow: hidden;
    border-radius: ${({theme}) => (theme.shape.borderRadius as number)}px;
    background-color: #0f0f0f;
    border: ${({theme}) => `1.5px solid ${theme.palette.primary.main}`};
`;

const StyledImg = styled('img')`
    display: block;
    width: 100%;
    height: 100%;
    max-height: 35vh;
    object-fit: contain; // Save proportions
    object-position: center;
`;

const ImagePlaceholder = styled(Box)`
    height: 100%;
    width: 100%;
    display: grid;
    place-items: center;
    color: ${({theme}) => theme.palette.secondary.main};
`;
