import {styled} from '@mui/material/styles';

import QuestionPlaceholder from './QuestionPlaceholder.tsx';
import {useGameContext} from '../../../context/GameContext.tsx';
import {getImageFromCategory} from './imageUtils.ts';

const ImageSection = () => {
    const category = useGameContext().duel.question.category;
    const imageUrl = getImageFromCategory(category, 1);

    if (!imageUrl) {
        return <QuestionPlaceholder/>;
    }

    return (
        <StyledImg
            src={imageUrl}
            alt="Image did not load..."
        />
    );
};

export default ImageSection;

const StyledImg = styled('img')`
    display: block;
    width: 100%;
    height: 100%;
    max-height: 40vh;
    object-fit: contain; // Save proportions
    object-position: center;
`;
