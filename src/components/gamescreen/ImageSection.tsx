import {Box, Typography} from '@mui/material';
import {styled} from '@mui/material/styles';
import {useGameContext} from '../../context/GameContext.tsx';

const ImageSection = () => {
    const {questionImageUrl, questionTitle} = useGameContext();

    return (
        <Container>
            {!questionImageUrl ? (
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
};

export default ImageSection;

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
