import {Container} from '@mui/material';
import {useGameContext} from '../context/GameContext';
import GameScreen from './gamescreen/GameScreen.tsx';
import WelcomeScreen from './WelcomeScreen.tsx';
import PlayerGrid from './grid/PlayerGrid.tsx';
import FinishedScreen from './FinishedScreen.tsx';

const GameContent = () => {
    const {
        gameState,
        activeMapPlayer,
    } = useGameContext();

    const renderContent = () => {
        switch (gameState) {
            case 'running':
                return <GameScreen/>;

            case 'finished': {
                return <FinishedScreen/>;
            }
            case 'map': {
                return (
                    <>
                        <h1 style={{color: 'white'}}>THE FLOOR</h1>
                        <h3 style={{color: 'white'}}>
                            Ruch gracza: <span style={{color: activeMapPlayer?.color}}>{activeMapPlayer?.name}</span>
                        </h3>
                        <PlayerGrid/>
                    </>
                );
            }
            case 'idle':
            default:
                return <WelcomeScreen/>;
        }
    };

    return (
        <Container maxWidth={false} disableGutters sx={{textAlign: 'center'}}>
            {renderContent()}
        </Container>
    );
};

export default GameContent;
