import React from 'react';
import {Container, GlobalStyles} from '@mui/material';
import {useGameContext} from '../context/GameContext.tsx';
import GameScreen from './gamescreen/GameScreen.tsx';
import FinishedScreen from './FinishedScreen.tsx';
import FloorScreen from './floor/FloorScreen.tsx';
import WelcomeScreen from './WelcomeScreen.tsx';

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

    const globalStyles = {
        html: {
            height: '100%',
        },
        body: {
            margin: 0,
            padding: 0,
            height: '100%',
            overflow: 'hidden',
        },
        '#root': {
            height: '100%',
        },
    };

    return (
        <>
            <GlobalStyles styles={globalStyles}/>
            <Container maxWidth={false} disableGutters sx={{textAlign: 'center'}}>
                {renderContent()}
            </Container>
        </>
    );
};

export default GameContent;
