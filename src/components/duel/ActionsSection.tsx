import {Box, Grid} from '@mui/material';
import DuelActions from "./action/DuelActions.tsx";
import {useGameContext} from "../../context/GameContext.tsx";
import PlayerTimeBoostSection from "./action/PlayerTimeBoostSection.tsx";

const ActionsSection = () => {
    const showTimeBoosts = useGameContext().general.gameState === 'ready';

    // TODO: take it from the Context
    const leftPlayerBoosts = 3;
    const rightPlayerBoosts = 1;

    return (
        <Box>
            <Grid container spacing={2} alignItems="flex-end">
                <Grid item xs={3}>
                    {showTimeBoosts && <PlayerTimeBoostSection boostsAvailable={leftPlayerBoosts}/>}
                </Grid>
                <Grid item xs={6}>
                    <DuelActions/>
                </Grid>
                <Grid item xs={3}>
                    {showTimeBoosts && <PlayerTimeBoostSection boostsAvailable={rightPlayerBoosts}/>}
                </Grid>
            </Grid>
        </Box>
    );
}

export default ActionsSection;
