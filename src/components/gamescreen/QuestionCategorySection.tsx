import {Box, Typography} from '@mui/material';
import {styled} from '@mui/material/styles';
import {useGameContext} from '../../context/GameContext.tsx';

const QuestionCategorySection = () => {
    const {activeQuestionCategory} = useGameContext();

    return (
        <Container>
            <CategoryText variant="h3" >
                {activeQuestionCategory}
            </CategoryText>
        </Container>
    );
};

export default QuestionCategorySection;

const Container = styled(Box)(({theme}) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing(1, 0),
    maxHeight: '10vh',
    margin: '0 auto',
    width: '100%',
    maxWidth: 'min(1800px, 95vw)',
}));

const CategoryText = styled(Typography)(({theme}) => ({
    color: theme.palette.text.primary,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    padding: theme.spacing(0.5, 2),
    borderRadius: theme.shape.borderRadius,
}));
