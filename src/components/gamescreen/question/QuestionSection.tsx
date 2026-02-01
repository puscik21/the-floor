import {styled} from '@mui/material/styles';
import StartDuelButton from './StartDuelButton.tsx';
import ImageSection from './ImageSection.tsx';
import {useGameContext} from '../../../context/GameContext.tsx';

const QuestionSection = () => {
    const gameState = useGameContext().general.gameState;
    // const questionType = duel.question.type; // TODO: retrieve type from each question in the future

    if (gameState === 'ready') {
        return (
            <Container>
                <StartDuelButton/>
            </Container>
        );
    } else if (gameState === 'duel') {
        return (
            <Container>
                <ImageSection/>
                {/*{questionType === 'image' && <ImageSection/>}*/}
                {/*{questionType === 'text' && <TextSection/>}*/}
                {/* Handle unknown question type */}
                {/*{questionType !== 'image' && questionType !== 'text' && <QuestionPlaceholder/>}*/}
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
    background-color: #0a1133;
    border: 3px solid rgba(255,255,255,0.06);
    box-shadow: inset 0 0 30px rgba(0,50,120,0.14);
    padding: ${({theme}) => theme.spacing(2)};
`;
