import {Box, Button, Typography} from '@mui/material';
import PlayerGrid from './PlayerGrid.tsx';
import {styled} from '@mui/material/styles';
import {useGameContext} from '../../context/GameContext.tsx';

const FloorScreen = () => {
    const {map: {hasWonPreviousDuel, activeMapPlayer}, actions: {handlePassFloorClick}} = useGameContext();

    return (
        <MapScreenWrapper>
            <FloorTitle variant="h2">THE FLOOR</FloorTitle>
            <Header>
                <HeaderText>Ruch gracza:</HeaderText>
                <PlayerName>{activeMapPlayer?.name || '-'}</PlayerName>
            </Header>
            <PlayerGrid/>
            <PassButton
                disabled={!hasWonPreviousDuel}
                onClick={handlePassFloorClick}
            >
                Pas
            </PassButton>
        </MapScreenWrapper>
    );
}

export default FloorScreen;

const FloorTitle = styled(Typography)`
    font-weight: 900;
    letter-spacing: 3px;
    text-align: center;
    margin: 12px 0 8px 0;
    font-size: 3rem;
    line-height: 1;
    background: linear-gradient(180deg, #FFD700 0%, #FFA500 40%, #D4AF37 80%, #FFD700 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    text-shadow: 0 6px 12px rgba(0, 40, 120, 0.6),
    0 0 18px rgba(0, 140, 255, 0.25);
`;

const Header = styled(Box)`
    color: rgba(255, 255, 255, 0.92);
    font-size: 1.05rem;
    margin-bottom: 16px;
    display: flex;
    gap: 8px;
    align-items: center;
`;

const MapScreenWrapper = styled(Box)`
    height: 100vh;
    overflow: auto;
    background: linear-gradient(180deg, #020b2d 0%, #243b95 100%);
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 32px 16px;
    box-sizing: border-box;
`;

const HeaderText = styled(Typography)`
    font-weight: 600;
    color: rgba(255, 255, 255, 0.95);
`;

const PlayerName = styled(Typography)`
    font-size: 1.5rem;
    text-transform: uppercase;
    font-weight: 900;
    color: rgba(255, 255, 255, 0.95);
`;

const PassButton = styled(Button)`
    background: linear-gradient(180deg, #17a2ff, #054e75);
    width: 300px;
    color: white;
    padding: 14px 36px;
    font-size: 1.05rem;
    font-weight: 800;
    border-radius: 12px;
    margin-top: 34px;
    transition: transform 0.22s, box-shadow 0.22s;

    &:hover {
        transform: scale(1.1);
        box-shadow: 0 14px 38px rgba(23, 162, 255, 0.44);
    }
`;
