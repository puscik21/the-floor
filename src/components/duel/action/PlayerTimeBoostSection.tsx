import {styled} from "@mui/material/styles";
import {Box, Button, Typography} from "@mui/material";
import type {DuelPlayer} from "../../../types.ts";
import {useGameContext} from "../../../context/GameContext.tsx";
import {useState} from "react";

interface PlayerTimeBoostSectionProps {
    playerName: string
    duelPlayer: DuelPlayer // TODO: probably can be simplified
}

const PlayerTimeBoostSection = ({playerName, duelPlayer}: PlayerTimeBoostSectionProps) => {
    const [timeBoostUsed, setTimeBoostUsed] = useState(false)
    const activateTimeBoostForPlayer = useGameContext().actions.activateTimeBoostForPlayer; // TODO: rename
    const findPlayerByName = useGameContext().actions.findPlayerByName;

    const boostsAvailable: number | undefined = findPlayerByName(playerName)?.timeBoostsAvailable;

    const handleAddTimeBoost = () => {
        activateTimeBoostForPlayer(playerName, duelPlayer)
        setTimeBoostUsed(true)
    }

    return (
        <BoostWrapper>
            <BoostLabel>
                Złote kwadraty: <CounterText>{boostsAvailable}</CounterText>
            </BoostLabel>
            <TimeBoostButton
                variant="contained"
                fullWidth
                onClick={handleAddTimeBoost}
                disabled={timeBoostUsed || boostsAvailable === 0}
            >
                Złoty kwadrat
            </TimeBoostButton>
        </BoostWrapper>
    )
}

export default PlayerTimeBoostSection;

const BoostWrapper = styled(Box)`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
`;

const BoostLabel = styled(Typography)`
    color: rgba(255, 255, 255, 0.7);
    font-size: 0.85rem;
    font-weight: 600;
    text-transform: capitalize;
    letter-spacing: 1px;
`;

const CounterText = styled('span')`
    color: #FFD700;
    font-size: 1.4rem;
    font-weight: 900;
    margin-left: 4px;
    text-shadow: 0 0 10px rgba(255, 215, 0, 0.5);
`;

const TimeBoostButton = styled(Button)`
    color: #1976D2;
    background: linear-gradient(180deg, #FFD700 0%, #FFC300 50%, #FFB300 100%);
    height: 80px;
    font-weight: 800;
    font-size: 1rem;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.45), inset 0 0 12px rgba(255, 255, 255, 0.02);
    transition: all 0.25s ease;
    border-radius: 12px;

    &:hover {
        background: linear-gradient(180deg, #FFE066 0%, #FFD700 60%, #FFC300 100%);
        transform: scale(1.04);
        filter: brightness(1.08);
    }

    &:disabled {
        background: rgba(255, 255, 255, 0.1);
        color: rgba(255, 255, 255, 0.3);
    }
`;
