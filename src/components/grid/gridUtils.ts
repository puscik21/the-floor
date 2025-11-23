import type {GameGrid, Player} from '../../types.ts';

type Dimensions = {
    rows: number;
    cols: number
}

export const MOCK_PLAYERS: Player[] = [
    {id: 'p1', name: 'Madzia', color: '#E53935'},
    {id: 'p2', name: 'Igor', color: '#1E88E5'},
    {id: 'p3', name: 'Nati', color: '#43A047'},
    {id: 'p4', name: 'Grześ', color: '#FDD835'},
    {id: 'p5', name: 'Seba', color: '#8E24AA'},
    {id: 'p6', name: 'The Michał', color: '#00897B'},
    {id: 'p7', name: 'Tomek', color: '#FF7043'},
    {id: 'p8', name: 'Monika', color: '#29B6F6'},
    {id: 'p9', name: 'Madzia 2', color: '#66BB6A'},
//     {id: 'p10', name: 'Daniel', color: '#FFD54F'},
//     {id: 'p11', name: 'Dominika', color: '#AB47BC'},
];

// TODO: with odd number of players move empty cells to the corner
export function initializeGrid(players: Player[]): GameGrid {
    const numPlayers = players.length;
    if (numPlayers === 0) return [];

    const {rows, cols} = calculateGridDimensions(numPlayers);
    const totalCells = rows * cols;

    const shuffledPlayers = [...players].sort(() => Math.random() - 0.5);
    const cellOwners: (Player | null)[] = shuffledPlayers;
    while (cellOwners.length < totalCells) {
        cellOwners.push(null); // Fill with empty cells
    }

    // TODO: Here we shuffle, so the empty cells are in random places
    //  We should rather put them in the corners
    //  will only 1 square be always empty?
    cellOwners.sort(() => Math.random() - 0.5);


    return Array(rows)
        .fill(null)
        .map((_, y) =>
            Array(cols)
                .fill(null)
                .map((_, x) => {
                    const player = cellOwners.pop();
                    return {
                        x,
                        y,
                        ownerId: player ? player.id : null,
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
