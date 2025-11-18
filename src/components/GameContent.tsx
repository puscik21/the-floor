import {Container} from '@mui/material';
import {useGameContext} from '../context/GameContext';
import GameScreen from './gamescreen/GameScreen.tsx';
import WelcomeScreen from './WelcomeScreen.tsx';
import PlayerGrid from './grid/PlayerGrid.tsx';
import FinishedScreen from './FinishedScreen.tsx';

const GameContent = () => {
    const {
        gameState,
        winner,
        allPlayers,
        grid,
        activeMapPlayerId,
        handleStartGame,
        handleReturnToMap,
        handleCellClick,
    } = useGameContext();

    const renderContent = () => {
        switch (gameState) {
            case 'running':
                return <GameScreen/>;

            case 'finished': {
                if (!winner) {
                    handleReturnToMap();
                    return null;
                }
                return <FinishedScreen winner={winner} onPlayAgain={handleReturnToMap}/>;
            }
            case 'map': {
                const activePlayer = allPlayers.find(p => p.id === activeMapPlayerId);
                return (
                    <>
                        <h1 style={{color: 'white'}}>THE FLOOR</h1>
                        <h3 style={{color: 'white'}}>
                            Ruch gracza: <span style={{color: activePlayer?.color}}>{activePlayer?.name}</span>
                        </h3>
                        <PlayerGrid
                            grid={grid}
                            players={allPlayers}
                            activePlayerId={activeMapPlayerId}
                            onCellClick={handleCellClick}
                        />
                    </>
                );
            }
            case 'idle':
            default:
                return <WelcomeScreen onStartGame={handleStartGame}/>;
        }
    };

    return (
        <Container maxWidth={false} disableGutters sx={{textAlign: 'center'}}>
            {renderContent()}
        </Container>
    );
};

export default GameContent;
