import {Button, Grid} from '@mui/material';
import {styled} from '@mui/material/styles';

type ActionsSectionProps = {
    passTimer: number;
    isPassPenaltyActive: boolean;
    onCorrectAnswer: () => void;
    onPass: () => void;
};

const ActionsSection = ({
                            passTimer,
                            isPassPenaltyActive,
                            onCorrectAnswer,
                            onPass,
                        }: ActionsSectionProps) => (
    <Container>
        <Grid container spacing={2}>
            <Grid size={12}>
                <Button
                    variant="contained"
                    color="success"
                    fullWidth
                    onClick={onCorrectAnswer}
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
                    onClick={onPass}
                    disabled={isPassPenaltyActive}
                    size="large"
                >
                    Pas
                </Button>
            </Grid>
        </Grid>
    </Container>
);

export default ActionsSection;

const Container = styled('footer')(({theme}) => ({
    paddingBottom: theme.spacing(1),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));
