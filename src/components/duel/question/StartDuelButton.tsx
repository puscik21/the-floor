import {styled} from '@mui/material/styles';
import {Button, Typography} from '@mui/material';
import {useGameContext} from '../../../context/GameContext.tsx';

const StartDuelButton = () => {
    const handleStartDuel = useGameContext().actions.handleStartDuel;

    return (
        <StartButton onClick={handleStartDuel}>
            <Text variant="h4">
                ROZPOCZNIJ GRĘ
            </Text>
        </StartButton>
    );
}

export default StartDuelButton;

const StartButton = styled(Button)`
    width: 80%;
    height: 120px;
    max-width: 700px;
    background: linear-gradient(180deg, #17a2ff, #054e75);
    color: white;
    border-radius: ${({theme}) => (theme.shape.borderRadius as number) * 2}px;
    box-shadow: 0 14px 36px rgba(10, 40, 80, 0.6);
    transition: transform 0.16s;

    &:hover {
        transform: scale(1.05);
    }
`;

const Text = styled(Typography)`
    font-weight: 900;
    letter-spacing: 1px;
`;
