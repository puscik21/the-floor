import React from 'react';
import { Container, Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useGameContext } from '../context/GameContext.tsx';
import GameScreen from './gamescreen/GameScreen.tsx';
import WelcomeScreen from './WelcomeScreen.tsx';
import PlayerGrid from './grid/PlayerGrid.tsx';
import FinishedScreen from './FinishedScreen.tsx';

/* --- Styl nagłówka THE FLOOR (spójny z WelcomeScreen) --- */
// NAPRAWIONO: Usunięto nieużywany parametr 'theme' z funkcji
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

/* --- Wrapper tła ekranu mapy --- */
const MapScreenWrapper = styled(Box)`
    width: 100%;
    min-height: 100vh;
    background: linear-gradient(180deg, #020b2d 0%, #06195f 100%);
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 32px 16px;
`;

const GameContent: React.FC = () => {
    const {
        general: { gameState },
        map: { activeMapPlayer },
    } = useGameContext();

    const renderContent = () => {
        switch (gameState) {
            case 'ready':
            case 'duel':
                return <GameScreen />;
            case 'finished':
                return <FinishedScreen />;
            case 'map':
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
                            <span style={{ color: activeMapPlayer?.color || '#17a2ff', fontWeight: 700 }}>
                {activeMapPlayer?.name || '-'}
              </span>
                        </Box>

                        <PlayerGrid />
                    </MapScreenWrapper>
                );
            case 'init':
            default:
                return <WelcomeScreen />;
        }
    };

    return (
        <Container maxWidth={false} disableGutters sx={{ textAlign: 'center' }}>
            {renderContent()}
        </Container>
    );
};

export default GameContent;