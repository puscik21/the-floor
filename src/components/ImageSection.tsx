import {Box, Card, CardMedia, Typography} from '@mui/material';
import {styled} from '@mui/material/styles';

type ImageSectionProps = {
    questionImageUrl?: string;
    questionTitle?: string;
};

const ImageSection = ({ questionImageUrl, questionTitle = 'Pytanie' }: ImageSectionProps) => (
    <TopArea>
        <ImageCard elevation={0}>
            {questionImageUrl ? (
                <StyledCardMedia
                    // @ts-expect-error - works as intended despite the type error
                    component="img"
                    image={questionImageUrl}
                    alt={questionTitle}
                />
            ) : (
                <ImagePlaceholder>
                    <Typography variant="subtitle1" sx={{ opacity: 0.7 }}>
                        (Tu pojawi się zdjęcie do pytania)
                    </Typography>
                </ImagePlaceholder>
            )}
        </ImageCard>
    </TopArea>
);

export default ImageSection;

const TopArea = styled('section')(() => ({
    maxWidth: 'min(1800px, 95vw)',
    margin: '0 auto',
    width: '100%',  // TODO: Not sure abot that
}));

const ImageCard = styled(Card)(({theme}) => ({
    height: '100%',
    width: '100%',
    borderRadius: (theme.shape.borderRadius as number) * 2,
    display: 'grid',
    placeItems: 'center',
    overflow: 'hidden',
    backgroundColor: '#0f0f0f',
    border: `1px solid ${theme.palette.divider}`,
}));

const StyledCardMedia = styled(CardMedia)(({ theme }) => ({
    display: 'block',
    width: '100%',
    height: 'auto',
    maxHeight: theme.breakpoints.up('md') ? '50vh' : '40vh',
    objectFit: 'contain',
    objectPosition: 'center',
    backgroundColor: '#101010',
}));

const ImagePlaceholder = styled(Box)(({theme}) => ({
    height: '100%',
    width: '100%',
    display: 'grid',
    placeItems: 'center',
    color: theme.palette.text.secondary,
}));
