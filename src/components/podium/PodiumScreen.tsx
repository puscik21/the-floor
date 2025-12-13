import React from 'react';
import {Box, Typography} from '@mui/material';
import {styled} from '@mui/material/styles';

interface PodiumPlayer {
    name: string;
    score: number; // TODO: change to numer of won games
    position: PodiumPosition;
}

interface PodiumStepProps {
    position: PodiumPosition;
}

type PodiumPosition = 1 | 2 | 3;

const mockPodiumData: PodiumPlayer[] = [
    {name: 'Krzysiek', score: 125, position: 1},
    {name: 'Anna', score: 98, position: 2},
    {name: 'Mateusz', score: 87, position: 3},
].sort((a, b) => a.position - b.position); // Sortowanie po pozycji 1, 2, 3

const getStepStyles = (position: PodiumPosition) => {
    switch (position) {
        case 1:
            return {
                height: '300px',
                width: '180px',
                background: 'linear-gradient(180deg, #FFD700 0%, #FFA500 100%)',
                color: '#000',
                order: 2,
                shadow: '0 0 40px rgba(255, 215, 0, 0.8), 0 10px 20px rgba(0, 0, 0, 0.5)',
            };
        case 2:
            return {
                height: '240px',
                width: '160px',
                background: 'linear-gradient(180deg, #C0C0C0 0%, #A9A9A9 100%)',
                color: '#000',
                order: 1,
                shadow: '0 0 30px rgba(192, 192, 192, 0.6), 0 8px 16px rgba(0, 0, 0, 0.4)',
            };
        case 3:
            return {
                height: '200px',
                width: '140px',
                background: 'linear-gradient(180deg, #CD7F32 0%, #B87333 100%)',
                color: '#000',
                order: 3,
                shadow: '0 0 20px rgba(205, 127, 50, 0.5), 0 6px 12px rgba(0, 0, 0, 0.3)',
            };
        default:
            return {};
    }
};

const PodiumStep = styled(Box)<PodiumStepProps>`
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

const PositionText = styled(Typography)<PodiumStepProps>`
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

// --- KOMPONENT ---
const PodiumScreen: React.FC = () => {
    // const { results } = useGameContext(); // Docelowe pobranie danych
    const podiumData = mockPodiumData; // Używamy mock

    // Funkcja do renderowania pojedynczego stopnia
    const renderPodiumStep = (player: PodiumPlayer) => (
        <PodiumStep key={player.position} position={player.position}>
            <PositionText position={player.position}>{player.position}</PositionText>
            <PlayerNameText>{player.name}</PlayerNameText>
        </PodiumStep>
    );

    const firstPlace = podiumData.find(p => p.position === 1);
    const secondPlace = podiumData.find(p => p.position === 2);
    const thirdPlace = podiumData.find(p => p.position === 3);

    return (
        <EndGameScreenWrapper>
            <FloorTitle variant="h2">ZWYCIĘZCY!</FloorTitle>

            <PodiumContainer>
                {/* 2. miejsce - po lewej (order: 1) */}
                {secondPlace && renderPodiumStep(secondPlace)}

                {/* 1. miejsce - w środku (order: 2) */}
                {firstPlace && renderPodiumStep(firstPlace)}

                {/* 3. miejsce - po prawej (order: 3) */}
                {thirdPlace && renderPodiumStep(thirdPlace)}
            </PodiumContainer>

            <Typography variant="h5" sx={{marginTop: '50px', color: 'rgba(255, 255, 255, 0.9)'}}>
                Dziękujemy za grę!
            </Typography>
            {/* Tutaj możesz dodać np. przycisk "Zagraj ponownie" */}
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

const FloorTitle = styled(Typography)`
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
    margin-bottom: 40px;
`;

const PodiumContainer = styled(Box)`
    display: flex;
    align-items: flex-end; /* Ważne: ustawia elementy na dole */
    justify-content: center;
    width: 100%;
    max-width: 600px;
    height: 50%; /* Wysokość dla wizualizacji różnicy poziomów */
    margin-top: 40px;
`;
