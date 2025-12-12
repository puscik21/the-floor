import {Box, Typography} from '@mui/material';
import {styled} from '@mui/material/styles';

const QuestionPlaceholder = () => {

    return (
        <Container>
            <Typography variant="h4" sx={{fontWeight: 700, color: 'rgba(255,255,255,0.92)'}}>
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
    color: rgba(255,255,255,0.9);
`;
