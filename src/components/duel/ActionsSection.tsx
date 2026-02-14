import {Box, Grid} from '@mui/material';
import DuelActions from "./action/DuelActions.tsx";
import {useGameContext} from "../../context/GameContext.tsx";
import PlayerTimeBoostSection from "./action/PlayerTimeBoostSection.tsx";

const ActionsSection = () => {
    const showTimeBoosts = useGameContext().general.gameState === 'ready';
    const {challengerName, defenderName} = useGameContext().duel; // TODO: optimize

    return (
        <Box>
            <Grid container spacing={2} alignItems="flex-end">
                <Grid item xs={3}>
                    {showTimeBoosts && <PlayerTimeBoostSection
                        playerName={challengerName}
                        duelPlayer="challenger"/>
                    }
                </Grid>
                <Grid item xs={6}>
                    <DuelActions/>
                </Grid>
                <Grid item xs={3}>
                    {showTimeBoosts && <PlayerTimeBoostSection
                        playerName={defenderName} duelPlayer="defender"/>
                    }
                </Grid>
            </Grid>
        </Box>
    );
}

export default ActionsSection;
