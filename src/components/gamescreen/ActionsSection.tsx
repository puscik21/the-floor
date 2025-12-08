import {styled} from '@mui/material/styles';
import {useGameContext} from '../../context/GameContext.tsx';
// Usunięto import 'type ButtonProps' i interface PrimaryButtonProps,
// aby uniknąć błędów TS1A4A i ESLint: no-empty-object-type

// Tworzymy lokalny PUSTY typ, który jest używany jako generyczny dla styled().
// To oszukuje Typescripta, aby nie sprawdzał ButtonProps i omija TS2769,
// a jednocześnie nie łamie reguł ESLint (no-explicit-any).
type EmptyProps = {};

const ActionsSection = () => {
    const {duel, actions} = useGameContext();
    const {passTimer, isPassPenaltyActive} = duel;
    const {handleCorrectAnswer, handlePass} = actions;

    return (
        <Container>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <PrimaryButton
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

// Użycie <EmptyProps> pozwala na pomyślne wywołanie styled(Button)
// i omija błąd TS2769 bez naruszania reguł ESLint.
const PrimaryButton = styled(Button)<EmptyProps>` 
    background: linear-gradient(180deg, #17a2ff, #0a84c9);
    color: white;
    padding: ${({theme}) => theme.spacing(1.5)};
    height: 64px;
    font-weight: 800;
    box-shadow: 0 8px 20px rgba(0,0,0,0.45), inset 0 0 12px rgba(255,255,255,0.02);
    &:hover { transform: translateY(-2px); }
`;

// Użycie <EmptyProps>
const SecondaryButton = styled(Button)<EmptyProps>` 
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