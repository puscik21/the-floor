import {styled} from '@mui/material/styles';

import {useGameContext} from '../../context/GameContext.tsx';
import StartGameButton from './StartGameButton.tsx';
import ImagePlaceholder from './ImagePlaceholder.tsx';

const ImageSection = () => {
    const {gameState, questionImageUrl, questionTitle} = useGameContext();

    if (gameState === 'ready') {
        return (
            <Container>
                <StartGameButton/>
            </Container>
        );
    } else if (gameState === 'duel') {
        return (
            <Container>
                {questionImageUrl ? (
                    <StyledImg src={questionImageUrl} alt={questionTitle}/>
                ) : (
                    <ImagePlaceholder/>
                )}
            </Container>
        );
    } else {
        return null;
    }
};

export default ImageSection;


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

const StyledImg = styled('img')`
    display: block;
    width: 100%;
    height: 100%;
    max-height: 35vh;
    object-fit: contain; // Save proportions
    object-position: center;
`;
