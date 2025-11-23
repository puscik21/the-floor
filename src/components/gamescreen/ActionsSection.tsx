import {Button, Grid} from '@mui/material';
import {styled} from '@mui/material/styles';
import {useGameContext} from '../../context/GameContext.tsx';

const ActionsSection = () => {
    const {
        passTimer,
        isPassPenaltyActive,
        handleCorrectAnswer,
        handlePass,
    } = useGameContext();

    return (
        <Container>
            <Grid container spacing={2}>
                <Grid size={12}>
                    <Button
                        variant="contained"
                        color="success"
                        fullWidth
                        onClick={handleCorrectAnswer}
                        disabled={isPassPenaltyActive}
                        size="large"
                    >
                        {isPassPenaltyActive ? `Czekaj... (${passTimer}s)` : 'Poprawna odpowiedź'}
                    </Button>
                </Grid>
                <Grid size={12}>
                    <Button
                        variant="outlined"
                        fullWidth
                        onClick={handlePass}
                        disabled={isPassPenaltyActive}
                        size="large"
                    >
                        Pas
                    </Button>
                </Grid>
            </Grid>
        </Container>
    );
}

export default ActionsSection;

const Container = styled('footer')(({theme}) => ({
    paddingBottom: theme.spacing(1),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));
