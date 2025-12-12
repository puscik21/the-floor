import {Box, Typography} from '@mui/material';
import {styled} from '@mui/material/styles';
import QuestionPlaceholder from './QuestionPlaceholder.tsx';

// TODO: in current version only image is displayed, use this for text questions in the future
const TextSection = () => {
    // const category = useGameContext().duel.question.category;
    // const questionText = getTextFromCategory(category, 1); // TODO: Move to Context
    const questionText = 'To be implemented'

    if (!questionText) {
        return <QuestionPlaceholder/>
    }

    return (
        <Container>
            <StyledText variant="h4">
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
    color: rgba(255,255,255,0.95);
    text-align: center;
    padding: ${({theme}) => theme.spacing(2)};
    font-weight: 800;
    letter-spacing: 0.5px;
`;
