import {Box, Button, Typography} from '@mui/material';
import {useGameContext} from '../context/GameContext.tsx';

const FinishedScreen = () => {
    const {general: {winner}, actions: {handleReturnToMap}} = useGameContext();
    if (!winner) {
        handleReturnToMap();
        return null;
    }

    return (
        <Box>
            <Typography variant="h3" gutterBottom>
                <span style={{color: winner.color}}>{winner.name}</span> wygrał!
            </Typography>
            <Typography variant="h5" color="textSecondary" gutterBottom>
                Gratulacja!
            </Typography>
            <Button variant="contained" size="large" onClick={handleReturnToMap} sx={{mt: 2}}>
                Kolejna runda?
            </Button>
        </Box>
    );
};

export default FinishedScreen;
