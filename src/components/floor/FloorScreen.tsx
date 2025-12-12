import {Box, Button, Typography} from '@mui/material';
import PlayerGrid from './PlayerGrid.tsx';
import {styled} from '@mui/material/styles';
import {useGameContext} from '../../context/GameContext.tsx';

const FloorScreen = () => {
    const activeMapPlayer = useGameContext().map.activeMapPlayer;

    return (
        <MapScreenWrapper>
            <FloorTitle variant="h2">THE FLOOR</FloorTitle>

            <Box
                sx={{
                    color: 'rgba(255,255,255,0.92)',
                    fontSize: '1.05rem',
                    mb: 2,
                    display: 'flex',
                    gap: 1,
                    alignItems: 'center',
                }}
            >
                <span>Ruch gracza:</span>
                <PlayerName>{activeMapPlayer?.name || '-'}</PlayerName>
            </Box>
            <PlayerGrid/>
            <PassButton>Pas</PassButton>
        </MapScreenWrapper>
    );
}

export default FloorScreen;

const FloorTitle = styled(Typography)(() => `
  font-weight: 900;
  letter-spacing: 3px;
  text-align: center;
  margin: 12px 0 8px 0;
  font-size: 3rem;
  line-height: 1;
  background: linear-gradient(180deg, #FFD700 0%, #FFA500 40%, #D4AF37 80%, #FFD700 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow:
    0 6px 12px rgba(0, 40, 120, 0.6),
    0 0 18px rgba(0, 140, 255, 0.25);
`);

const MapScreenWrapper = styled(Box)`
    width: 100%;
    min-height: 100vh;
    background: linear-gradient(180deg, #020b2d 0%, #3b4c93 100%);
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 32px 16px;
`;

const PlayerName = styled(Typography)`
    text-transform: uppercase;
    font-weight: 900;
    color: rgba(255, 255, 255, 0.95);
`;

const PassButton = styled(Button)`
    background: linear-gradient(180deg, #17a2ff, #086498);
    color: white;
    padding: 14px 36px;
    font-size: 1.05rem;
    font-weight: 800;
    border-radius: 12px;
    margin-top: 34px;
    box-shadow: 0 10px 30px rgba(23, 162, 255, 0.28);
    transition: transform 0.22s, box-shadow 0.22s;

    &:hover {
        //transform: translateY(-3px) scale(1.02);
        box-shadow: 0 14px 38px rgba(23, 162, 255, 0.44);
    }
`;
