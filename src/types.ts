export interface GameContextValue {
    general: GeneralState;
    map: MapState;
    duel: DuelInfo;
    actions: GameActions;
}

export interface GeneralState {
    gameState: GameState;
    winner: Player | null;
}

export type GameState = 'init' | 'floor' | 'ready' | 'duel' | 'finished';

export interface Player {
    name: string;
    category: string;
}

export type GameGrid = GridCell[][];

export interface GridCell {
    x: number;
    y: number;
    ownerName: string | null;
}

export interface MapState {
    grid: GameGrid;
    allPlayers: Player[];
    activeMapPlayer: Player | null;
    hasWonPreviousDuel: boolean;
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
    id: number
    category: string;
    imageUrl: string;
}

export interface GameActions {
    handleStartGame: () => void;
    handleStartDuel: () => void;
    handleReturnToMap: () => void;
    handleCellClick: (cell: GridCell) => void;
    handleCorrectAnswer: () => void;
    handlePass: () => void;
    handlePassFloorClick: () => void;
}

export interface PodiumPlayer {
    name: string;
    score: number; // TODO: change to number of won games
    position: PodiumPosition;
}

export type PodiumPosition = 1 | 2 | 3;
