import {Button, Card, CardContent, Grid, Stack, Typography} from '@mui/material';

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
        <Stack spacing={3}>
            <Grid container spacing={3}>
                <Grid item xs={6}>
                    <Card sx={{border: activePlayer === 1 ? 2 : 0, borderColor: 'primary.main'}}>
                        <CardContent>
                            <Typography variant="h6">Player 1</Typography>
                            <Typography variant="h2" component="div">{playerTimer1}</Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={6}>
                    <Card sx={{border: activePlayer === 2 ? 2 : 0, borderColor: 'primary.main'}}>
                        <CardContent>
                            <Typography variant="h6">Player 2</Typography>
                            <Typography variant="h2" component="div">{playerTimer2}</Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Button
                        variant="contained"
                        fullWidth
                        onClick={onCorrectAnswer}
                        disabled={isPassPenaltyActive}
                    >
                        {isPassPenaltyActive ? `Wait... (${passTimer}s)` : 'Correct answer!'}
                    </Button>
                </Grid>
                <Grid item xs={12}>
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
        </Stack>
    );
};
