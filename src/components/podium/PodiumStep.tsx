import {styled} from '@mui/material/styles';
import {Box, Typography} from '@mui/material';
import {getStepStyles} from './podiumUtils.ts';
import type {PodiumPlayer, PodiumPosition} from '../../types.ts';

interface PodiumStepProps {
    player: PodiumPlayer
}

const PodiumStep = ({player}: PodiumStepProps) => {
    return (
        <Container key={player.position} position={player.position}>
            <PositionText position={player.position}>{player.position}</PositionText>
            <PlayerNameText>{player.name}</PlayerNameText>
        </Container>
    );
}

export default PodiumStep;

interface PodiumStepStyleProps {
    position: PodiumPosition;
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
    text-transform: uppercase;

    ${({position}) => {
        const styles = getStepStyles(position);
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

const PositionText = styled(Typography)<PodiumStepStyleProps>`
    font-size: 2.2rem;
    font-weight: 900;
    color: #000;
    line-height: 1;
    text-shadow: 0 0 8px rgba(255, 255, 255, 0.8);
`;

const PlayerNameText = styled(Typography)`
    font-size: 1.2rem;
    font-weight: 800;
    text-align: center;
    margin-top: 12px;
    padding: 0 4px;
    color: #222;
    word-break: break-word;
`;
