import {Box} from '@mui/material';
import {styled} from '@mui/material/styles';
import PlayersSection from './PlayersSection.tsx';
import ActionsSection from './ActionsSection.tsx';
import QuestionCategorySection from './question/QuestionCategorySection.tsx';
import QuestionSection from './question/QuestionSection.tsx';

const GameScreen = () => {
    return (
        <Container>
            <Inner>
                <QuestionCategorySection/>
                <QuestionSection/>
                <PlayersSection/>
                <ActionsSection/>
            </Inner>
        </Container>
    );
};

export default GameScreen;

const Container = styled(Box)`
    min-height: 100vh;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: radial-gradient(1200px 600px at 10% 10%, rgba(23,162,255,0.03), transparent 10%),
                linear-gradient(180deg, #09090b 0%, #0f0f12 60%);
    padding: ${({theme}) => theme.spacing(4)};
`;

const Inner = styled(Box)`
    width: min(1800px, 95vw);
    height: min(1000px, 94vh);
    display: grid;
    grid-template-rows: auto minmax(200px, 1fr) auto auto;
    gap: ${({theme}) => theme.spacing(4)};
    padding: ${({theme}) => theme.spacing(3)};
    background-color: #0f0f0f;
    border: 6px solid #222;
    box-shadow: 0 20px 60px rgba(0,0,0,0.7), inset 0 0 30px rgba(0,0,0,0.6);
    border-radius: ${({theme}) => theme.shape.borderRadius}px;
`;
