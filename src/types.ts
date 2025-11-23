export type DuelPlayer = 'challenger' | 'defender';

export interface Player {
    id: string;
    name: string;
    color: string;
}

export interface GridCell {
    x: number;
    y: number;
    ownerId: string | null;
}

export type GameGrid = GridCell[][];
