import type {GameGrid, Player} from './types.ts';

const GRID_SIZE = 10;

export const initializeGrid = (players: Player[]): GameGrid => {
    const grid: GameGrid = Array(GRID_SIZE)
        .fill(null)
        .map((_, y) =>
            Array(GRID_SIZE)
                .fill(null)
                .map((_, x) => ({x, y, ownerId: null})),
        );
    const availableCells: { x: number; y: number }[] = [];
    for (let y = 0; y < GRID_SIZE; y++) {
        for (let x = 0; x < GRID_SIZE; x++) {
            availableCells.push({x, y});
        }
    }
    for (let i = availableCells.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [availableCells[i], availableCells[j]] = [
            availableCells[j],
            availableCells[i],
        ];
    }
    players.forEach((player, index) => {
        if (index < availableCells.length) {
            const cellCoords = availableCells[index];
            grid[cellCoords.y][cellCoords.x].ownerId = player.id;
        }
    });
    return grid;
}
