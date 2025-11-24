import {Box} from '@mui/material';
import {styled} from '@mui/material/styles';
import ImageSection from './ImageSection.tsx';
import PlayersSection from './PlayersSection.tsx';
import ActionsSection from './ActionsSection.tsx';
import QuestionCategorySection from './QuestionCategorySection.tsx';

// TODO: add description
// TODO: add START button
const GameScreen = () => {
    return (
        <Container>
            <QuestionCategorySection/>
            <ImageSection/>
            <PlayersSection/>
            <ActionsSection/>
        </Container>
    );
};

export default GameScreen;

const Container = styled(Box)(({theme}) => ({
    height: '100vh',
    width: '100%',
    display: 'grid',
    gridTemplateRows: 'auto minmax(180px, 45vh) 1fr auto',
    gap: theme.spacing(5),
    padding: theme.spacing(3),
}));
