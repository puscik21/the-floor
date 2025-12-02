import {styled} from '@mui/material/styles';
import {useGameContext} from '../../context/GameContext.tsx';
import StartGameButton from './StartGameButton.tsx';
import ImageSection from './ImageSection.tsx';
import TextSection from './TextSection.tsx';
import QuestionPlaceholder from './QuestionPlaceholder.tsx';

const QuestionSection = () => {
    const {gameState, questionType} = useGameContext();

    if (gameState === 'ready') {
        return (
            <Container>
                <StartGameButton/>
            </Container>
        );
    } else if (gameState === 'duel') {
        return (
            <Container>
                {questionType === 'image' && <ImageSection/>}
                {questionType === 'text' && <TextSection/>}
                {/* Handle unknown question type */}
                {questionType !== 'image' && questionType !== 'text' && <QuestionPlaceholder/>}
            </Container>
        );
    }
    return null;
};

export default QuestionSection;

const Container = styled('section')`
    max-width: min(1800px, 95vw);
    margin: 0 auto;
    width: 100%;
    display: grid;
    place-items: center;
    overflow: hidden;
    border-radius: ${({theme}) => (theme.shape.borderRadius as number)}px;
    background-color: #0f0f0f;
    border: ${({theme}) => `1.5px solid ${theme.palette.primary.main}`};
`;
