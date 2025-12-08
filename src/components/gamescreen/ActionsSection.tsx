// Rozwiązanie TS1A4A: Używamy 'type' do importu tylko typu ButtonProps
import {Button, Grid, type ButtonProps} from '@mui/material';
import {styled} from '@mui/material/styles';
import {useGameContext} from '../../context/GameContext.tsx';
// Nie potrzebujemy już ręcznie definiować interfejsu PrimaryButtonProps
// (rozwiązuje ESLint: no-empty-object-type)

const ActionsSection = () => {
    const {duel, actions} = useGameContext();
    const {passTimer, isPassPenaltyActive} = duel;
    const {handleCorrectAnswer, handlePass} = actions;

    return (
        <Container>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <PrimaryButton
                        // Po instalacji poprawnej wersji MUI (5.x),
                        // TS2769 zniknie samoczynnie.
                        variant="contained"
                        fullWidth
                        onClick={handleCorrectAnswer}
                        disabled={isPassPenaltyActive}
                        size="large"
                    >
                        {isPassPenaltyActive ? `Czekaj... (${passTimer}s)` : 'Poprawna odpowiedź'}
                    </PrimaryButton>
                </Grid>

                <Grid item xs={12}>
                    <SecondaryButton
                        variant="outlined"
                        fullWidth
                        onClick={handlePass}
                        disabled={isPassPenaltyActive}
                        size="large"
                    >
                        Pas
                    </SecondaryButton>
                </Grid>
            </Grid>
        </Container>
    );
}

export default ActionsSection;

const Container = styled('footer')`
    padding-bottom: ${({theme}) => theme.spacing(1)};
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
`;

// Teraz, gdy ButtonProps jest poprawny, używamy go jawnie.
const PrimaryButton = styled(Button)<ButtonProps>` 
    background: linear-gradient(180deg, #17a2ff, #0a84c9);
    color: white;
    padding: ${({theme}) => theme.spacing(1.5)};
    height: 64px;
    font-weight: 800;
    box-shadow: 0 8px 20px rgba(0,0,0,0.45), inset 0 0 12px rgba(255,255,255,0.02);
    &:hover { transform: translateY(-2px); }
`;

// Jawne użycie ButtonProps
const SecondaryButton = styled(Button)<ButtonProps>`
    border: 2px solid rgba(255,255,255,0.08);
    padding: ${({theme}) => theme.spacing(1.25)};
    height: 56px;
    font-weight: 800;
    color: rgba(255,255,255,0.95);
    &:hover {
        border-color: #ffffff;
        transform: translateY(-2px);
    }
`;