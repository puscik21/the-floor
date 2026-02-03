import {styled} from '@mui/material/styles';
import {Box, Typography} from '@mui/material';
import {getStepStyles} from './podiumUtils.ts';
import type {PodiumPlayer, PodiumPosition} from '../../types.ts';

interface PodiumStepProps {
    player: PodiumPlayer
}

const PodiumStep = ({player}: PodiumStepProps) => {
    return (
        <Container key={player.position} podiumPosition={player.position}>
            <PositionText>{player.position}</PositionText>
            <PlayerNameText>{player.name}</PlayerNameText>
            <StatisticsContainer>
                <StatisticLine>
                    <StatisticsText>Wygrane pojedynki:</StatisticsText>
                    <StatisticsNumber>{player.duelsWon}</StatisticsNumber>
                </StatisticLine>

                <StatisticLine>
                    <StatisticsText>Złote kwadraty:</StatisticsText>
                    <StatisticsNumber>{player.timeBoostsUsed}</StatisticsNumber>
                </StatisticLine>
            </StatisticsContainer>
        </Container>
    );
}

export default PodiumStep;

interface PodiumStepStyleProps {
    podiumPosition: PodiumPosition;
}

const Container = styled(Box)<PodiumStepStyleProps>`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    padding-top: 10px;
    margin: 0 10px;
    position: relative;
    border-radius: 6px 6px 0 0;
    font-weight: 800;
    word-break: break-word;
    user-select: none; // User cannot select it by a mistake

    ${({podiumPosition}) => {
        const styles = getStepStyles(podiumPosition);
        return `
            height: ${styles.height};
            width: ${styles.width};
            background: ${styles.background};
            box-shadow: ${styles.shadow};
            order: ${styles.order};
        `;
    }}
        /* Additional dark edge on the bottom */
    &::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 15px;
        background-color: rgba(0, 0, 0, 0.2);
        border-radius: 0 0 6px 6px;
    }
`;

const PositionText = styled(Typography)`
    font-size: 2.5rem;
    font-weight: 900;
    color: #000;
    line-height: 1;
    text-shadow: 0 0 8px rgba(255, 255, 255, 0.8);
`;

const PlayerNameText = styled(Typography)`
    font-size: 1.6rem;
    font-weight: 800;
    color: #222;
    text-align: center;
    margin-top: 0.8rem;
    padding: 0 4px;
    margin-bottom: 1.2rem;
`;

const StatisticsContainer = styled(Box)`
    position: absolute;
    bottom: 1rem;
    justify-items: center;
    text-transform: capitalize;
    font-size: 1.4rem;
`

const StatisticLine = styled(Box)`
    display: flex;
    flex-direction: row;
`

const StatisticsText = styled(Typography)`
    font-size: 1.2rem;
    color: #222;
    opacity: 0.5;
    text-align: center;
    margin-right: 0.3rem;
`;

const StatisticsNumber = styled(Typography)`
    font-size: 1.2rem;
    font-weight: 800;
    color: #222;
    opacity: 0.8;
    text-align: center;
`;
