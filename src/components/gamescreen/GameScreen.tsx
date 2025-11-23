import {Box} from '@mui/material';
import {styled} from '@mui/material/styles';
import ImageSection from './ImageSection.tsx';
import PlayersSection from './PlayersSection.tsx';
import ActionsSection from './ActionsSection.tsx';

// TODO: add description
// TODO: add START button
const GameScreen = () => {
    return (
        <Container>
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
    gridTemplateRows: 'minmax(180px, 35vh) 1fr auto',
    gap: theme.spacing(2),
    padding: theme.spacing(3),
}));
