import {styled} from '@mui/material/styles';

import QuestionPlaceholder from './QuestionPlaceholder.tsx';
import {useGameContext} from '../../../context/GameContext.tsx';

const ImageSection = () => {
    const {questionImageUrl} = useGameContext();

    if (!questionImageUrl) {
        return <QuestionPlaceholder/>;
    }

    return (
        <StyledImg
            src={questionImageUrl}
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
