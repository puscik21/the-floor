import {Box, Typography} from '@mui/material';
import {styled} from '@mui/material/styles';
import QuestionPlaceholder from './QuestionPlaceholder.tsx';
import {useGameContext} from '../../../context/GameContext.tsx';

const TextSection = () => {
    const {questionText} = useGameContext();

    if (!questionText) {
        return <QuestionPlaceholder/>
    }

    return (
        <Container>
            <StyledText variant="h3">
                {questionText}
            </StyledText>
        </Container>
    );
};

export default TextSection;

const Container = styled(Box)`
    max-width: 95vw;
    margin: 0 auto;
    width: 100%;
    height: 100%;
    display: grid;
    place-items: center;
`;

const StyledText = styled(Typography)`
    color: ${({theme}) => theme.palette.text.primary};
    text-align: center;
    padding: ${({theme}) => theme.spacing(2)};
    font-weight: bold;
`;
