export interface GameConfig {
    initTimeSeconds: number;
    passPenaltySeconds: number;
    winStreakForTimeBoost: number;
    imageFileFormat: string;
    correctAnswerButton: string;
    passButton: string;
    shufflePlayers: boolean;
}

export interface GameContextValue {
    general: GeneralState;
    map: MapState;
    duel: DuelInfo;
    actions: GameActions;
    config: GameConfig;
}

export interface GeneralState {
    gameState: GameState;
    winner: Player | null;
}

export type GameState = 'init' | 'floor' | 'ready' | 'duel' | 'finished' | 'podium';

export interface PlayerBase {
    name: string;
    category: string;
}

export interface Player extends PlayerBase {
    isPlaying: boolean;
    winStreak: number;
    duelsWon: number;
    timeBoostsAvailable: number;
    timeBoostsUsed: number;
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
    positionToPlayer: Map<number, Player>
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
    activateTimeBoostForPlayer: (playerName: string, duelPlayer: DuelPlayer) => void;
    handleReturnToMap: () => void;
    handleCellClick: (cell: GridCell) => void;
    handleCorrectAnswer: () => void;
    handlePass: () => void;
    handlePassFloorClick: () => void;
    findPlayerByName: (name: string) => Player | undefined
}

export interface PodiumPlayer {
    name: string;
    duelsWon: number;
    timeBoostsUsed: number;
    position: PodiumPosition;
}

export type PodiumPosition = 1 | 2 | 3;
