import {styled} from '@mui/material/styles';
import {Box, Typography} from '@mui/material';

const ImagePlaceholder = () => {

    return (
        <Container>
            <Typography variant="subtitle1" sx={{opacity: 0.7}}>
                (Tu pojawi się zdjęcie do pytania)
            </Typography>
        </Container>
    );
}

export default ImagePlaceholder;

const Container = styled(Box)`
    height: 100%;
    width: 100%;
    display: grid;
    place-items: center;
    color: ${({theme}) => theme.palette.secondary.main};
`;
