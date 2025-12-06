import {Box, Typography} from '@mui/material';
import {styled} from '@mui/material/styles';
import {useGameContext} from '../../../context/GameContext.tsx';

const QuestionCategorySection = () => {
    const category = useGameContext().duel.questionCategory;

    return (
        <Container>
            <CategoryText variant="h3">
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
    max-height: 5vh;
    margin: 0 auto;
    width: 100%;
    max-width: min(1800px, 95vw);
`;

const CategoryText = styled(Typography)`
    font-weight: bold;
    text-align: center;
    background-color: #333;
    border: 3px solid ${({theme}) => theme.palette.divider};
    border-radius: ${({theme}) => theme.shape.borderRadius}px;
    padding: ${({theme}) => theme.spacing(1.5, 3.5)};
`;
