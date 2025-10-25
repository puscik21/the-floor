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
        <Stack
            spacing={3}
            sx={{
                maxWidth: 900,
                margin: 'auto',
                marginTop: 4,
                padding: {xs: 2, sm: 4},
                backgroundColor: '#1a1a1a',
                borderRadius: 3,
                boxShadow: '0 8px 24px rgba(0,0,0,0.7)',
            }}
        >
            <Grid container spacing={3}>
                <Grid size={6}>
                    <Card sx={{border: activePlayer === 1 ? 2 : 0, borderColor: 'primary.main'}}>
                        <CardContent>
                            <Typography variant="h6" sx={{textTransform: 'uppercase', fontWeight: 'bold'}}>
                                Player 1
                            </Typography>
                            <Typography variant="h2" component="div" sx={{fontWeight: 'bold'}}>
                                {playerTimer1}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid size={6}>
                    <Card sx={{border: activePlayer === 2 ? 2 : 0, borderColor: 'primary.main'}}>
                        <CardContent>
                            <Typography variant="h6" sx={{textTransform: 'uppercase', fontWeight: 'bold'}}>
                                Player 2
                            </Typography>
                            <Typography variant="h2" component="div" sx={{fontWeight: 'bold'}}>
                                {playerTimer2}
                            </Typography>
                        </CardContent>
                    </Card>
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
        </Stack>
    );
};
