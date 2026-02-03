import {Box, Typography} from '@mui/material';
import {styled} from '@mui/material/styles';
import type {Player, PodiumPlayer, PodiumPosition} from '../../types.ts';
import PodiumStep from './PodiumStep.tsx';
import {useGameContext} from '../../context/GameContext.tsx';
import ConfettiOverlay from "../../utils/confetti/ConfettiOverlay.tsx";

const mapPlayerToPodiumPlayer = (position: PodiumPosition, player: Player): PodiumPlayer => {
    return {name: player.name, duelsWon: player.duelsWon, timeBoostsUsed: player.timeBoostsUsed, position: position}
}

const PodiumScreen = () => {
    const positionToPlayer = useGameContext().map.positionToPlayer;

    if (positionToPlayer.size < 3) {
        return null;
    }

    const firstPlace = mapPlayerToPodiumPlayer(1, positionToPlayer.get(1)!)
    const secondPlace = mapPlayerToPodiumPlayer(2, positionToPlayer.get(2)!)
    const thirdPlace = mapPlayerToPodiumPlayer(3, positionToPlayer.get(3)!)

    return (
        <EndGameScreenWrapper>
            <ConfettiOverlay duration={60000} initialBurst={200} zIndex={50}/>
            <Title variant="h2">ZWYCIĘZCY!</Title>

            <PodiumContainer>
                {secondPlace && <PodiumStep player={secondPlace}/>}
                {firstPlace && <PodiumStep player={firstPlace}/>}
                {thirdPlace && <PodiumStep player={thirdPlace}/>}
            </PodiumContainer>

            <ThanksForGameText variant="h4">
                Dziękujemy za grę!
            </ThanksForGameText>
        </EndGameScreenWrapper>
    );
};

export default PodiumScreen;

const EndGameScreenWrapper = styled(Box)`
    height: 100vh;
    overflow: auto;
    background: linear-gradient(180deg, #020b2d 0%, #243b95 100%);
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 32px 16px;
    box-sizing: border-box;
    color: white;
`;

const Title = styled(Typography)`
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

const PodiumContainer = styled(Box)`
    display: flex;
    align-items: flex-end; /* Set items on the bottom - all steps starts from the same height */
    justify-content: center;
    width: 70%;
    height: 60%;
    margin-top: 40px;
`;

const ThanksForGameText = styled(Typography)`
    color: #bfbfbf;
    margin-top: 50px;
    font-weight: 600;
    letter-spacing: 1px;
`
