import {Box, Typography} from '@mui/material';
import {styled} from '@mui/material/styles';
import {useGameContext} from '../../../context/GameContext.tsx';

const QuestionCategorySection = () => {
    const category = useGameContext().duel.question.category;

    return (
        <Container>
            <CategoryText variant="h5">
                {category}
            </CategoryText>
        </Container>
    );
};

export default QuestionCategorySection;

const Container = styled(Box)`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
`;

const CategoryText = styled(Typography)`
    font-weight: 900;
    text-align: center;
    background-color: rgba(0,0,0,0.45);
    border: 3px solid rgba(255,255,255,0.06);
    border-radius: ${({theme}) => theme.shape.borderRadius}px;
    padding: ${({theme}) => theme.spacing(1, 3)};
    color: rgba(255,255,255,0.92);
`;
