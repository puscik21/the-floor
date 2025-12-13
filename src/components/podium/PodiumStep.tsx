import React from 'react';
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

    /* Dynamiczne style na podstawie pozycji */

    ${({position}) => {
        const styles = getStepStyles(position);
        return `
            height: ${styles.height};
            width: ${styles.width};
            background: ${styles.background};
            box-shadow: ${styles.shadow};
            order: ${styles.order};
            transition: all 0.5s ease;
        `;
    }}
        /* Dodatkowa ciemna krawędź u dołu dla efektu głębi */
    &::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 10px;
        background-color: rgba(0, 0, 0, 0.2);
        border-radius: 0 0 6px 6px;
    }
`;

const PositionText = styled(Typography)<PodiumStepStyleProps>`
    font-size: 2.2rem;
    font-weight: 900;
    color: #000;
    text-shadow: 0 2px 4px rgba(255, 255, 255, 0.4);
    line-height: 1;
    margin-bottom: 4px;

    /* Specjalny styl dla 1. miejsca */
    ${({position}) => position === 1 && `
        color: #B8860B; /* Ciemniejszy złoty dla numeru */
        text-shadow: 0 0 8px rgba(255, 255, 255, 0.8);
    `}
`;

const PlayerNameText = styled(Typography)`
    font-size: 0.9rem;
    font-weight: 800;
    text-align: center;
    margin-top: 8px;
    padding: 0 4px;
    color: #222; /* Ciemniejszy tekst na jasnym tle podium */
    word-break: break-word;
`;
