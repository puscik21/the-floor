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

    const timeAsText = (time: number): string => {
        return Math.max(0, time).toFixed(1)
    }

    return (
        <Container>
            <PlayersRow>
                <PlayerCard isActive={activePlayer === 'challenger'}>
                    <CardInner>
                        <PlayerName variant="h6">{challengerName}</PlayerName>
                        <PlayerTimer variant="h2">{timeAsText(challengerTimer)}</PlayerTimer>
                    </CardInner>
                </PlayerCard>
                <CenterSpace/>
                <PlayerCard isActive={activePlayer === 'defender'}>
                    <CardInner>
                        <PlayerName variant="h6">{defenderName}</PlayerName>
                        <PlayerTimer variant="h2">{timeAsText(defenderTimer)}</PlayerTimer>
                    </CardInner>
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
    gap: ${({theme}) => theme.spacing(2)};
`;

const CenterSpace = styled(Box)`
    flex: 0 2 400px;
`;

/* PlayerCard: spójny wygląd z kafelkiem */
const PlayerCard = styled(Card, {
    shouldForwardProp: (prop) => prop !== 'isActive',
})<{ isActive: boolean }>`
    flex: 1 1 40%;
    max-width: 25%;
    background-color: #0a1133;
    box-shadow: inset 0 0 18px rgba(0, 40, 110, 0.45);
    display: flex;
    align-items: center;
    justify-content: center;
    border: 3px solid rgba(255, 255, 255, 0.04);
    transition: transform 0.12s ease, box-shadow 0.25s ease, border 0.2s ease;
    cursor: pointer;

    ${({isActive}) => isActive && `
        border: 4px solid #17a2ff;
        box-shadow: 
            0 0 18px #17a2ff,
            0 0 36px #17a2ff,
            inset 0 0 30px #17a2ff;
    `}
`;

const CardInner = styled(CardContent)`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: ${({theme}) => theme.spacing(0.5)};
`;

const PlayerName = styled(Typography)`
    text-transform: uppercase;
    font-weight: 900;
    color: rgba(255, 255, 255, 0.95);
`;

const PlayerTimer = styled(Typography)`
    font-weight: 900;
    color: rgba(255, 255, 255, 0.98);
    font-size: 2.4rem;
`;
