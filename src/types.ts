export interface GameContextValue {
    general: GeneralState;
    map: MapState;
    duel: DuelInfo;
    actions: GameActions;
}

export interface GeneralState {
    gameState: GameState;
    winner: Player | null;
    // Usunięto: isConquering: boolean;
}

export type GameState = 'init' | 'map' | 'ready' | 'duel' | 'finished';

export interface Player {
    id: string;
    name: string;
    category: string;
    color: string;
}

export type GameGrid = GridCell[][];

export interface GridCell {
    x: number;
    y: number;
    ownerId: string | null;
}

export interface MapState {
    grid: GameGrid;
    allPlayers: Player[];
    activeMapPlayer: Player | null;
}

export interface DuelInfo {
    challengerTimer: number;
    defenderTimer: number;
    activePlayer: DuelPlayer;
    passTimer: number;
    isPassPenaltyActive: boolean;

    challengerName: string;
    defenderName: string;

    question: Question;
}

export type DuelPlayer = 'challenger' | 'defender';

export type Question = {
    category: string;
    type: QuestionType;
    imageUrl?: string;
    text?: string;
}

// TODO: introduce Question type
// TODO: each question should have this value
export type QuestionType = 'image' | 'text';

export interface GameActions {
    handleStartGame: () => void;
    handleStartDuel: () => void;
    handleReturnToMap: () => void;
    handleCellClick: (cell: GridCell) => void;
    handleCorrectAnswer: () => void;
    handlePass: () => void;
}