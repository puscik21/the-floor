import {Box} from '@mui/material';
import {styled} from '@mui/material/styles';
import PlayersSection from './PlayersSection.tsx';
import ActionsSection from './ActionsSection.tsx';
import QuestionCategorySection from './QuestionCategorySection.tsx';
import QuestionSection from './QuestionSection.tsx';

const GameScreen = () => {
    return (
        <Container>
            <QuestionCategorySection/>
            <QuestionSection/>
            <PlayersSection/>
            <ActionsSection/>
        </Container>
    );
};

export default GameScreen;

const Container = styled(Box)`
    height: 100vh;
    width: 100%;
    display: grid;
    grid-template-rows: auto minmax(180px, 45vh) 1fr auto;
    gap: ${({theme}) => theme.spacing(5)};
    padding: ${({theme}) => theme.spacing(3)};
`;
