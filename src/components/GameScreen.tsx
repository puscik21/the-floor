import {Box, Button, Card, CardContent, CardMedia, Grid, Typography} from '@mui/material';
import {styled} from '@mui/material/styles';

export type GameScreenProps = {
    playerTimer1: number;
    playerTimer2: number;
    activePlayer: 1 | 2;
    passTimer: number;
    isPassPenaltyActive: boolean;
    onCorrectAnswer: () => void;
    onPass: () => void;
    questionImageUrl?: string;
    questionTitle?: string;
};

export const GameScreen = ({
                               playerTimer1,
                               playerTimer2,
                               activePlayer,
                               passTimer,
                               isPassPenaltyActive,
                               onCorrectAnswer,
                               onPass,
                               questionImageUrl,
                               questionTitle = 'Pytanie',
                           }: GameScreenProps) => {
    return (
        <Root>
            <TopArea>
                <ImageCard elevation={0}>
                    {questionImageUrl ? (
                        <StyledCardMedia
                            // @ts-expect-error - works as intended despite the type error
                            component="img"
                            image={questionImageUrl}
                            alt={questionTitle}
                        />
                    ) : (
                        <ImagePlaceholder>
                            <Typography variant="subtitle1" sx={{opacity: 0.7}}>
                                (Tu pojawi się zdjęcie do pytania)
                            </Typography>
                        </ImagePlaceholder>
                    )}
                </ImageCard>
            </TopArea>

            <MiddleArea>
                <PlayersRow>
                    <PlayerCard isActive={activePlayer === 1}>
                        <CardContent>
                            <PlayerName variant="h5">Player 1</PlayerName>
                            <PlayerTimer variant="h1">{playerTimer1}</PlayerTimer>
                        </CardContent>
                    </PlayerCard>

                    <CenterSpace/>

                    <PlayerCard isActive={activePlayer === 2}>
                        <CardContent>
                            <PlayerName variant="h5">Player 2</PlayerName>
                            <PlayerTimer variant="h1">{playerTimer2}</PlayerTimer>
                        </CardContent>
                    </PlayerCard>
                </PlayersRow>
            </MiddleArea>

            <BottomArea>
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
            </BottomArea>
        </Root>
    );
};

const Root = styled(Box)(({theme}) => ({
    height: '100vh',
    width: '100%', // TODO: can be removed?
    display: 'grid',
    gridTemplateRows: 'minmax(180px, 35vh) 1fr auto',
    gap: theme.spacing(2),
    padding: theme.spacing(3),
}));

const TopArea = styled('section')(() => ({
    maxWidth: 'min(1800px, 95vw)',
    margin: '0 auto',
    width: '100%',  // TODO: Not sure abot that
}));

const ImageCard = styled(Card)(({theme}) => ({
    height: '100%',
    width: '100%',
    borderRadius: (theme.shape.borderRadius as number) * 2,
    display: 'grid',
    placeItems: 'center',
    overflow: 'hidden',
    backgroundColor: '#0f0f0f',
    border: `1px solid ${theme.palette.divider}`,
}));

const StyledCardMedia = styled(CardMedia)(({ theme }) => ({
    display: 'block',
    width: '100%',
    height: 'auto',
    maxHeight: theme.breakpoints.up('md') ? '50vh' : '40vh',
    objectFit: 'contain',
    objectPosition: 'center',
    backgroundColor: '#101010',
}));

const ImagePlaceholder = styled(Box)(({theme}) => ({
    height: '100%',
    width: '100%',
    display: 'grid',
    placeItems: 'center',
    color: theme.palette.text.secondary,
}));

const MiddleArea = styled('section')(() => ({
    maxWidth: 'min(1800px, 95vw)',
    margin: '0 auto',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const PlayersRow = styled(Box)(({theme}) => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: theme.spacing(50), // TODO: probably bigger Center Space
    width: '100%',
}));

const CenterSpace = styled(Box)(() => ({
    flex: '0 1 320px',
}));

const BottomArea = styled('footer')(({theme}) => ({
    paddingBottom: theme.spacing(1),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const PlayerCard = styled(Card, {
    shouldForwardProp: (prop) => prop !== 'isActive',
})<{ isActive: boolean }>(({theme, isActive}) => ({
    flex: '1 1 40%',
    // minHeight: 220,
    // maxWidth: '48%',
    backgroundColor: '#1a1a1a',
    boxShadow: '0 10px 28px rgba(0,0,0,0.45)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

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
