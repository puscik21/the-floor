import {styled} from '@mui/material/styles';
import {Box, Card, CardContent, Typography} from '@mui/material';
import type {DuelPlayer} from '../../types.ts';

type PlayersSectionProps = {
    challengerTimer: number;
    defenderTimer: number;
    activePlayer: DuelPlayer;
    challengerName: string;
    defenderName: string;
};

const PlayersSection = ({
                            challengerTimer,
                            defenderTimer,
                            activePlayer,
                            challengerName,
                            defenderName
                        }: PlayersSectionProps) => (
    <Container>
        <PlayersRow>
            <PlayerCard isActive={activePlayer === 'challenger'}>
                <CardContent>
                    <PlayerName variant="h5">{challengerName}</PlayerName>
                    <PlayerTimer variant="h1">{challengerTimer}</PlayerTimer>
                </CardContent>
            </PlayerCard>
            <CenterSpace/>
            <PlayerCard isActive={activePlayer === 'defender'}>
                <CardContent>
                    <PlayerName variant="h5">{defenderName}</PlayerName>
                    <PlayerTimer variant="h1">{defenderTimer}</PlayerTimer>
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

const PlayersRow = styled(Box)(() => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
}));

const CenterSpace = styled(Box)(() => ({
    flex: '0 2 800px',
}));

const PlayerCard = styled(Card, {
    shouldForwardProp: (prop) => prop !== 'isActive',
})<{ isActive: boolean }>(({theme, isActive}) => ({
    flex: '1 1 40%',
    // minHeight: 220,
    maxWidth: '25%',
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
