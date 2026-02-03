import {Box, Container, GlobalStyles} from '@mui/material';
import {useGameContext} from '../context/GameContext.tsx';
import GameScreen from './duel/GameScreen.tsx';
import FloorScreen from './floor/FloorScreen.tsx';
import WelcomeScreen from './welcome/WelcomeScreen.tsx';
import PodiumScreen from './podium/PodiumScreen.tsx';
import FinishedDuelScreen from "./duel/finish/FinishedDuelScreen.tsx";
import {styled} from "@mui/material/styles";

const GameContent = () => {
    const gameState = useGameContext().general.gameState;

    const renderContent = () => {
        switch (gameState) {
            case 'ready':
            case 'duel':
                return <GameScreen/>;
            case 'finished':
                return <FinishedDuelScreen/>;
            case 'floor':
                return <FloorScreen/>
            case 'podium':
                return <PodiumScreen/>
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
        <ContentContainer>
            <GlobalStyles styles={globalStyles}/>
            <Container maxWidth={false} disableGutters sx={{textAlign: 'center'}}>
                {renderContent()}
            </Container>
        </ContentContainer>
    );
};

export default GameContent;

const ContentContainer = styled(Box)`
    user-select: none; // User cannot select it by a mistake
`
