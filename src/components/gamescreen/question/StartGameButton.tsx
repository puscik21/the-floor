import {styled} from '@mui/material/styles';
import {Button, Typography} from '@mui/material';
import {useGameContext} from '../../../context/GameContext.tsx';

const StartGameButton = () => {
    const handleStartDuel = useGameContext().actions.handleStartDuel;

    return (
        <StartButton onClick={handleStartDuel}>
            <Text variant="h4">
                ROZPOCZNIJ GRĘ
            </Text>
        </StartButton>
    );
}

export default StartGameButton;

const StartButton = styled(Button)`
    width: 80%;
    height: 80%;
    max-width: 600px;
    background-color: ${({theme}) => theme.palette.primary.main};
    color: ${({theme}) => theme.palette.primary.contrastText};
    border-radius: ${({theme}) => (theme.shape.borderRadius as number) * 2}px;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.5);
    transition: transform 0.2s;

    &:hover {
        transform: scale(1.02);
        background-color: ${({theme}) => theme.palette.primary.dark};
    }
`;

const Text = styled(Typography)`
    font-weight: bold;
`
