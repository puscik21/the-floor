import {Button, type ButtonProps, Grid} from '@mui/material';
import {styled} from '@mui/material/styles';
import {useGameContext} from '../../context/GameContext.tsx';
import {useCallback, useEffect} from 'react';

const ActionsSection = () => {
    const {general, duel, actions} = useGameContext();
    const {passTimer, isPassPenaltyActive} = duel;
    const {handleCorrectAnswer, handlePass} = actions;

    const areKeysDisabled = useCallback(() => isPassPenaltyActive || general.gameState !== 'duel',
        [general.gameState, isPassPenaltyActive],
    );

    const handleKeyDown = useCallback((event: KeyboardEvent) => {
        if (areKeysDisabled()) {
            return;
        }

        if (event.code === 'Space') {
            event.preventDefault();
            handleCorrectAnswer();
        } else if (event.key === 'f' || event.key === 'F') {
            handlePass();
        }
    }, [areKeysDisabled, handleCorrectAnswer, handlePass]);

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [handleKeyDown]);

    return (
        <Container>
            <Grid container spacing={2}>
                <Grid xs={12}>
                    <PrimaryButton
                        // Po instalacji poprawnej wersji MUI (5.x),
                        // TS2769 zniknie samoczynnie.
                        variant="contained"
                        fullWidth
                        onClick={handleCorrectAnswer}
                        disabled={areKeysDisabled()}
                        size="large"
                    >
                        {isPassPenaltyActive ? `Czekaj... (${passTimer.toFixed(0)}s)` : 'Poprawna odpowiedź'}
                    </PrimaryButton>
                </Grid>

                <Grid xs={12}>
                    <SecondaryButton
                        variant="outlined"
                        fullWidth
                        onClick={handlePass}
                        disabled={areKeysDisabled()}
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
    width: 50%;
    margin-left: auto;
    margin-right: auto;
`;

const PrimaryButton = styled(Button)<ButtonProps>`
    //background: linear-gradient(180deg, #17a2ff, #0a84c9); // Possibly use this
    color: white;
    height: 64px;
    font-weight: 800;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.45), inset 0 0 12px rgba(255, 255, 255, 0.02);
    transition: all 0.25s ease;

    &:hover {
        box-shadow: 0 0 10px #17a2ff,
        0 0 20px rgba(23, 162, 255, 0.4),
        inset 0 0 20px rgba(255, 255, 255, 0.1);
        transform: scale(1.005);
    }
`;

const SecondaryButton = styled(Button)<ButtonProps>`
    border: 2px solid rgba(255, 255, 255, 0.08);
    height: 56px;
    font-weight: 800;
    color: rgba(255, 255, 255, 0.95);
    transition: all 0.25s ease;

    &:hover {
        box-shadow: 0 0 10px #17a2ff,
        0 0 20px rgba(23, 162, 255, 0.4),
        inset 0 0 20px rgba(255, 255, 255, 0.1);
        transform: scale(1.005);
    }
`;
