import {Button, Grid} from '@mui/material';
import {styled} from '@mui/material/styles';
import {useGameContext} from '../../context/GameContext.tsx';
import {useCallback, useEffect} from 'react';

const ActionsSection = () => {
    const {duel, actions} = useGameContext();
    const {passTimer, isPassPenaltyActive} = duel;
    const {handleCorrectAnswer, handlePass} = actions;

    const handleKeyDown = useCallback((event: KeyboardEvent) => {
        if (isPassPenaltyActive) {
            return;
        }

        if (event.code === 'Space') {
            event.preventDefault();
            handleCorrectAnswer();
        } else if (event.key === 'f' || event.key === 'F') {
            handlePass();
        }
    }, [isPassPenaltyActive, handleCorrectAnswer, handlePass]);

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [handleKeyDown]);

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

const Container = styled('footer')`
    padding-bottom: ${({theme}) => theme.spacing(1)};
    display: flex;
    align-items: center;
    justify-content: center;
`;
