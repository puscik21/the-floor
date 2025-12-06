import {styled} from '@mui/material/styles';
import {Box, Card, CardContent, Typography} from '@mui/material';
import {useGameContext} from '../../context/GameContext.tsx';

const PlayersSection = () => {
    const {
        challengerTimer,
        defenderTimer,
        activePlayer,
        challengerName,
        defenderName,
    } = useGameContext().duel;

    return (
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
}

export default PlayersSection;

const Container = styled('section')`
    max-width: min(1800px, 95vw);
    margin: 0 auto;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const PlayersRow = styled(Box)`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
`;

const CenterSpace = styled(Box)`
    flex: 0 2 800px;
`;

const PlayerCard = styled(Card, {
    shouldForwardProp: (prop) => prop !== 'isActive',
})<{ isActive: boolean }>`
    flex: 1 1 40%;
    // min-height: 220px;
    max-width: 25%;
    background-color: #1a1a1a;
    box-shadow: 0 10px 28px rgba(0, 0, 0, 0.45);
    display: flex;
    align-items: center;
    justify-content: center;

    border-width: ${({isActive}) => (isActive ? 2 : 0)}px;
    border-style: solid;
    border-color: ${({theme}) => theme.palette.primary.main};
    transition: border-width 0.2s ease-in-out;
`;

const PlayerName = styled(Typography)`
    text-transform: uppercase;
    font-weight: bold;
`;

const PlayerTimer = styled(Typography)`
    font-weight: bold;
`;
