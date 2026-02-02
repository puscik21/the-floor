import {styled} from '@mui/material/styles';
import {Box} from '@mui/material';
import QuestionPlaceholder from './QuestionPlaceholder.tsx';
import {useGameContext} from '../../../context/GameContext.tsx';

const ImageSection = () => {
    const imageUrl = useGameContext().duel.question.imageUrl;

    if (!imageUrl) {
        return <QuestionPlaceholder/>;
    }

    return (
        <ImageWrapper>
            <StyledImg
                src={imageUrl}
                alt="Image did not load..."
            />
        </ImageWrapper>
    );
};

export default ImageSection;

const ImageWrapper = styled(Box)`
    width: 100%;
    max-height: 40vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: ${({theme}) => theme.spacing(1.5)};
    background: linear-gradient(180deg, rgba(255,255,255,0.02), transparent);
    border-radius: ${({theme}) => (theme.shape.borderRadius as number)}px;
`;

const StyledImg = styled('img')`
    display: block;
    width: 100%;
    height: 100%;
    max-height: 40vh;
    object-fit: contain;
    object-position: center;
    border-radius: ${({theme}) => (theme.shape.borderRadius as number)}px;
    border: 2px solid rgba(255,255,255,0.04);
`;
