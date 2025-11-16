import {Box} from '@mui/material';
import {styled} from '@mui/material/styles';
import ImageSection from './ImageSection.tsx';
import PlayersSection from './PlayersSection.tsx';
import ActionsSection from './ActionsSection.tsx';
import type {DuelPlayer} from '../../types.ts';

export type GameScreenProps = {
    playerTimer1: number;
    playerTimer2: number;
    activePlayer: DuelPlayer;
    passTimer: number;
    isPassPenaltyActive: boolean;
    onCorrectAnswer: () => void;
    onPass: () => void;
    questionImageUrl?: string;
    questionTitle?: string;
    challengerName: string;
    defenderName: string;
};

// TODO: add description
// TODO: add START button
export const GameScreen = ({
                               playerTimer1,
                               playerTimer2,
                               activePlayer,
                               passTimer,
                               isPassPenaltyActive,
                               onCorrectAnswer,
                               onPass,
                               questionImageUrl,
                               questionTitle,
                               challengerName,
                               defenderName
                           }: GameScreenProps) => {
    return (
        <Container>
            <ImageSection
                questionImageUrl={questionImageUrl}
                questionTitle={questionTitle}
            />
            <PlayersSection
                playerTimer1={playerTimer1}
                playerTimer2={playerTimer2}
                activePlayer={activePlayer}
                challengerName={challengerName}
                defenderName={defenderName}
            />
            <ActionsSection
                passTimer={passTimer}
                isPassPenaltyActive={isPassPenaltyActive}
                onCorrectAnswer={onCorrectAnswer}
                onPass={onPass}
            />
        </Container>
    );
};

const Container = styled(Box)(({theme}) => ({
    height: '100vh',
    width: '100%',
    display: 'grid',
    gridTemplateRows: 'minmax(180px, 35vh) 1fr auto',
    gap: theme.spacing(2),
    padding: theme.spacing(3),
}));
