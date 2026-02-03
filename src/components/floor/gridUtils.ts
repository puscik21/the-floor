import type {GameGrid, PlayerBase} from '../../types.ts';

type Dimensions = {
    rows: number;
    cols: number
}

export function initializeGrid(players: PlayerBase[], shufflePlayers: boolean): GameGrid {
    const numPlayers = players.length;
    if (numPlayers === 0) return [];

    const {rows, cols} = calculateGridDimensions(numPlayers);
    const totalCells = rows * cols;

    const cellOwners: (PlayerBase | null)[] = shufflePlayers ? [...players].sort(() => Math.random() - 0.5) : [...players];
    while (cellOwners.length < totalCells) {
        cellOwners.push(null); // Fill with empty cells
    }

    return Array(rows)
        .fill(null)
        .map((_, y) =>
            Array(cols)
                .fill(null)
                .map((_, x) => {
                    const player = cellOwners.shift();
                    return {
                        x,
                        y,
                        ownerName: player ? player.name : null,
                    };
                }),
        );
}

const calculateGridDimensions = (numPlayers: number): Dimensions => {
    if (numPlayers <= 0) return {rows: 0, cols: 0};

    const sqrt = Math.sqrt(numPlayers);

    let rows = Math.floor(sqrt);
    let cols: number;

    // If we have a beautiful square...
    if (rows * rows === numPlayers) {
        cols = rows;
        return {rows, cols};
    }

    // If not, look for the shape the nearest to square
    // e.g. for 11 players:
    // 1x11 (diff 10)
    // 2x6 (diff 4)
    // 3x4 (diff 1) <-- Eureka!
    let bestRows = 1;
    let bestCols = numPlayers;
    let minDiff = numPlayers - 1;

    for (let r = 2; r <= Math.floor(sqrt); r++) {
        if (numPlayers % r === 0) {
            const c = numPlayers / r;
            const diff = Math.abs(c - r);
            if (diff < minDiff) {
                minDiff = diff;
                bestRows = r;
                bestCols = c;
            }
        }
    }

    // TODO: rethink
    if (bestRows === 1 && numPlayers > 2) {
        rows = Math.floor(sqrt);
        cols = Math.ceil(numPlayers / rows);
        return {rows, cols};
    } else {
        return {rows: bestRows, cols: bestCols};
    }
};
