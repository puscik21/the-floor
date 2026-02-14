import {Box, Button, type ButtonProps} from "@mui/material";
import {styled} from "@mui/material/styles";
import {useGameContext} from "../../../context/GameContext.tsx";
import {useCallback, useEffect} from "react";

const DuelActions = () => {
    const {general, duel, actions, config} = useGameContext();
    const {passTimer, isPassPenaltyActive} = duel;
    const {handleCorrectAnswer, handlePass} = actions;

    const areKeysDisabled = useCallback(() => isPassPenaltyActive || general.gameState !== 'duel',
        [general.gameState, isPassPenaltyActive],
    );

    const handleKeyDown = useCallback((event: KeyboardEvent) => {
        if (areKeysDisabled()) {
            return;
        }

        const configCorrectAnswer = config.correctAnswerButton.toLowerCase();
        const configPass = config.passButton.toLowerCase();

        const pressedKey = event.key.toLowerCase();
        const pressedCode = event.code.toLowerCase(); // for 'Space' button

        if (configCorrectAnswer === 'space' && (pressedCode === 'space' || pressedKey === ' ')) {
            event.preventDefault();
            handleCorrectAnswer();
            return;
        } else if (pressedKey === configCorrectAnswer) {
            handleCorrectAnswer();
            return;
        } else if (pressedKey === configPass) {
            handlePass();
        }
    }, [areKeysDisabled, config.correctAnswerButton, config.passButton, handleCorrectAnswer, handlePass]);

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [handleKeyDown]);

    return (
        <Box display="flex" flexDirection="column" gap={1}> {/* TODO: styled component */}
            <PrimaryButton
                variant="contained"
                fullWidth
                onClick={handleCorrectAnswer}
                disabled={areKeysDisabled()}
            >
                {isPassPenaltyActive ? `Czekaj... (${passTimer.toFixed(0)}s)` : 'Poprawna odpowiedź'}
            </PrimaryButton>
            <SecondaryButton
                variant="outlined"
                fullWidth
                onClick={handlePass}
                disabled={areKeysDisabled()}
            >
                Pas
            </SecondaryButton>
        </Box>
    );
}

export default DuelActions;

const PrimaryButton = styled(Button)<ButtonProps>`
    color: white;
    height: 64px;
    font-weight: 800;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.45), inset 0 0 12px rgba(255, 255, 255, 0.02);
    transition: all 0.25s ease;

    &:hover {
        box-shadow: 0 0 10px #17a2ff,
        0 0 20px rgba(23, 162, 255, 0.4),
        inset 0 0 20px rgba(255, 255, 255, 0.1);
        transform: scale(1.005);
    }
`;

const SecondaryButton = styled(Button)<ButtonProps>`
    border: 2px solid rgba(255, 255, 255, 0.08);
    height: 56px;
    font-weight: 800;
    color: rgba(255, 255, 255, 0.95);
    transition: all 0.25s ease;

    &:hover {
        box-shadow: 0 0 10px #17a2ff,
        0 0 20px rgba(23, 162, 255, 0.4),
        inset 0 0 20px rgba(255, 255, 255, 0.1);
        transform: scale(1.005);
    }
`;
