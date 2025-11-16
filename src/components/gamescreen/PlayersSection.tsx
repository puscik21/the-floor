import {styled} from '@mui/material/styles';
import {Box, Card, CardContent, Typography} from '@mui/material';

type PlayersSectionProps = {
    playerTimer1: number;
    playerTimer2: number;
    activePlayer: 1 | 2;
};

const PlayersSection = ({
                            playerTimer1,
                            playerTimer2,
                            activePlayer,
                        }: PlayersSectionProps) => (
    <Container>
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
    </Container>
);

export default PlayersSection;

const Container = styled('section')(() => ({
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
