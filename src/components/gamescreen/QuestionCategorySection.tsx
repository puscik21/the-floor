import {Box, Typography} from '@mui/material';
import {styled} from '@mui/material/styles';
import {useGameContext} from '../../context/GameContext.tsx';

const QuestionCategorySection = () => {
    const {activeQuestionCategory} = useGameContext();

    return (
        <Container>
            <CategoryText variant="h3">
                {activeQuestionCategory}
            </CategoryText>
        </Container>
    );
};

export default QuestionCategorySection;

const Container = styled(Box)(() => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    maxHeight: '5vh',
    margin: '0 auto',
    width: '100%',
    maxWidth: 'min(1800px, 95vw)',
}));

const CategoryText = styled(Typography)(({theme}) => ({
    color: theme.palette.text.se,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: '#333',
    border: `3px solid ${theme.palette.divider}`,
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(1.5, 3.5),
}));
