import {Box, Typography} from '@mui/material';
import {styled} from '@mui/material/styles';
import {useGameContext} from '../../context/GameContext.tsx';

const ImageSection = () => {
    const {questionImageUrl, questionTitle} = useGameContext();

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
};

export default ImageSection;

const Container = styled('section')(({theme}) => ({
    maxWidth: 'min(1800px, 95vw)',
    margin: '0 auto',
    width: '100%',
    display: 'grid',
    placeItems: 'center',
    overflow: 'hidden',
    borderRadius: (theme.shape.borderRadius as number) * 2,
    backgroundColor: '#0f0f0f',
    border: `1px solid ${theme.palette.divider}`,
}));


const StyledImg = styled('img')({
    display: 'block',
    width: '100%',
    height: '100%',
    maxHeight: '35vh',
    objectFit: 'contain', // Save proportions
    objectPosition: 'center',
});

const ImagePlaceholder = styled(Box)(({theme}) => ({
    height: '100%',
    width: '100%',
    display: 'grid',
    placeItems: 'center',
    color: theme.palette.text.secondary,
    alignSelf: 'stretch', // So the placeholder fill height
    justifySelf: 'stretch',
}));
