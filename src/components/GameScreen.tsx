import {Button, Card, CardContent, Grid, Stack, Typography} from '@mui/material';
import {styled} from '@mui/material/styles';

type GameScreenProps = {
    playerTimer1: number;
    playerTimer2: number;
    activePlayer: 1 | 2;
    passTimer: number;
    isPassPenaltyActive: boolean;
    onCorrectAnswer: () => void;
    onPass: () => void;
};

export const GameScreen = ({
                               playerTimer1,
                               playerTimer2,
                               activePlayer,
                               passTimer,
                               isPassPenaltyActive,
                               onCorrectAnswer,
                               onPass,
                           }: GameScreenProps) => {
    return (
        <MainStack spacing={3}>
            <Grid container spacing={3}>
                <Grid size={6}>
                    <PlayerCard isActive={activePlayer === 1}>
                        <CardContent>
                            <PlayerName variant="h6">Player 1</PlayerName>
                            <PlayerTimer variant="h2">
                                {playerTimer1}
                            </PlayerTimer>
                        </CardContent>
                    </PlayerCard>
                </Grid>
                <Grid size={6}>
                    <PlayerCard isActive={activePlayer === 2}>
                        <CardContent>
                            <PlayerName variant="h6">Player 2</PlayerName>
                            <PlayerTimer variant="h2">
                                {playerTimer2}
                            </PlayerTimer>
                        </CardContent>
                    </PlayerCard>
                </Grid>
            </Grid>

            <Grid container spacing={2}>
                <Grid size={12}>
                    <Button
                        variant="contained"
                        color="success"
                        fullWidth
                        onClick={onCorrectAnswer}
                        disabled={isPassPenaltyActive}
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
                    >
                        Pass
                    </Button>
                </Grid>
            </Grid>
        </MainStack>
    );
};

const MainStack = styled(Stack)(({theme}) => ({
    maxWidth: 900,
    margin: 'auto',
    marginTop: theme.spacing(4),
    padding: theme.spacing(4),
    backgroundColor: '#1a1a1a',
    borderRadius: (theme.shape.borderRadius as number) * 3,
    boxShadow: '0 8px 24px rgba(0,0,0,0.7)',
}))

const PlayerCard = styled(Card, {
    shouldForwardProp: (prop) => prop !== 'isActive',
})<{ isActive: boolean }>
(({theme, isActive}) => ({
    borderWidth: isActive ? 2 : 0,
    borderStyle: 'solid',
    borderColor: theme.palette.primary.main,
    transition: 'border-width 0.2s ease-in-out',
}));

const PlayerName = styled(Typography)(() => ({
    textTransform: 'uppercase',
    fontWeight: 'bold',
}))

const PlayerTimer = styled(Typography)(() => ({
    fontWeight: 'bold',
}))
