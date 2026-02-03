import {Box, Button, Grid} from '@mui/material';
import {styled} from '@mui/material/styles';
import DuelActions from "./action/DuelActions.tsx";

const ActionsSection = () => {
    return (
        <Box>
            <Grid container spacing={2}>
                <Grid item xs={3}>
                    <TimeBoostButton
                        variant="contained"
                        fullWidth
                        // onClick={handleCorrectAnswer}
                        // disabled={areKeysDisabled()}
                    >
                        Złoty kwadrat
                    </TimeBoostButton>
                </Grid>

                <Grid item xs={6}>
                    <DuelActions/>
                </Grid>

                <Grid item xs={3}>
                    <TimeBoostButton
                        variant="contained"
                        fullWidth
                        // onClick={handleCorrectAnswer}
                        // disabled={areKeysDisabled()}
                    >
                        Złoty kwadrat
                    </TimeBoostButton>
                </Grid>
            </Grid>
        </Box>
    );
}

export default ActionsSection;

const TimeBoostButton = styled(Button)`
    color: #1976D2;
    background: linear-gradient(180deg, #FFD700 0%, #FFC300 50%, #FFB300 100%);
    height: 64px;
    font-weight: 800;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.45), inset 0 0 12px rgba(255, 255, 255, 0.02);
    transition: all 0.25s ease;

    &:hover {
        background: linear-gradient(180deg, #FFE066 0%, #FFD700 60%, #FFC300 100%);
        transform: scale(1.04);
        filter: brightness(1.08);
    }
`;
