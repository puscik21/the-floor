import {styled} from '@mui/material/styles';
import {Box, Typography} from '@mui/material';

const QuestionPlaceholder = () => {

    return (
        <Container>
            <Typography variant="h3">
                (Tu pojawi się pytanie...)
            </Typography>
        </Container>
    );
}

export default QuestionPlaceholder;

const Container = styled(Box)`
    height: 100%;
    width: 100%;
    display: grid;
    place-items: center;
    color: ${({theme}) => theme.palette.secondary.main};
    opacity: 0.8;
`;
