import React from 'react';
import {Container} from '@mui/material';
import {useGameContext} from '../context/GameContext.tsx';
import GameScreen from './gamescreen/GameScreen.tsx';
import WelcomeScreen from './WelcomeScreen.tsx';
import FinishedScreen from './FinishedScreen.tsx';
import FloorScreen from './floor/FloorScreen.tsx';

const GameContent: React.FC = () => {
    const gameState = useGameContext().general.gameState;

    const renderContent = () => {
        switch (gameState) {
            case 'ready':
            case 'duel':
                return <GameScreen/>;
            case 'finished':
                return <FinishedScreen/>;
            case 'floor':
                return <FloorScreen/>
            case 'init':
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
