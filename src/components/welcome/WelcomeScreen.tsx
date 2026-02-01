import React from 'react';
import {Box} from '@mui/material';
import {styled} from '@mui/material/styles';
import TitleLogo from "./TitleLogo.tsx";
import MovingSubtitle from "./MovingSubtitle.tsx";
import StartGameButton from "./StartGameButton.tsx";

const WelcomeScreen: React.FC = () => {
    return (
        <WelcomeContainer>
            <TitleLogo/>
            <MovingSubtitle/>
            <StartGameButton/>
        </WelcomeContainer>
    );
};

export default WelcomeScreen;

const WelcomeContainer = styled(Box)`
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: white;
    text-align: center;
    padding: 16px;

    background-image: linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
    background-size: 50px 50px;
    box-shadow: inset 0 0 100px rgba(0, 0, 0, 0.5);
`;
