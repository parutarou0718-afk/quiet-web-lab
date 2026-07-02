export interface Tile {
  id: string;
  symbol: string;
  label: string;
}

export interface BoardCell {
  tile: Tile | null;
  removed: boolean;
}

export interface Position {
  row: number;
  col: number;
}

export interface PathPoint {
  row: number;
  col: number;
}

export interface MatchPath {
  points: PathPoint[];
  turns: number;
}

export interface BoardSize {
  rows: number;
  cols: number;
}

export const DEFAULT_BOARD_SIZE: BoardSize = { rows: 8, cols: 8 };

export const EASTERN_TILE_SET: Tile[] = [
  { id: "red", symbol: "中", label: "Mahjong center tile" },
  { id: "bamboo", symbol: "竹", label: "Bamboo tile" },
  { id: "coin", symbol: "銭", label: "Old coin" },
  { id: "tea", symbol: "茶", label: "Tea tile" },
  { id: "fan", symbol: "扇", label: "Folding fan" },
  { id: "seal", symbol: "印", label: "Seal stamp" },
  { id: "scroll", symbol: "巻", label: "Scroll tile" },
  { id: "lantern", symbol: "灯", label: "Lantern tile" },
  { id: "gate", symbol: "門", label: "Gate tile" },
  { id: "moon", symbol: "月", label: "Moon tile" },
  { id: "plum", symbol: "梅", label: "Plum tile" },
  { id: "sakura", symbol: "桜", label: "Sakura tile" },
  { id: "rice", symbol: "米", label: "Rice tile" },
  { id: "paper", symbol: "紙", label: "Paper tile" },
  { id: "ink", symbol: "墨", label: "Ink tile" },
  { id: "jade", symbol: "玉", label: "Jade tile" },
  { id: "temple", symbol: "寺", label: "Temple tile" },
  { id: "bridge", symbol: "橋", label: "Bridge tile" },
  { id: "garden", symbol: "庭", label: "Garden tile" },
  { id: "festival", symbol: "祭", label: "Festival tile" },
  { id: "porcelain", symbol: "瓷", label: "Porcelain tile" },
  { id: "chopsticks", symbol: "箸", label: "Chopsticks tile" },
  { id: "kimono", symbol: "衣", label: "Traditional clothing tile" },
  { id: "mask", symbol: "面", label: "Festival mask tile" },
  { id: "knot", symbol: "結", label: "Decorative knot tile" },
  { id: "bowl", symbol: "碗", label: "Bowl tile" },
  { id: "tower", symbol: "塔", label: "Tower tile" },
  { id: "gong", symbol: "鑼", label: "Gong tile" },
  { id: "screen", symbol: "簾", label: "Screen tile" },
  { id: "book", symbol: "書", label: "Book tile" },
  { id: "lotus", symbol: "蓮", label: "Lotus tile" },
  { id: "cloud", symbol: "雲", label: "Cloud tile" }
];

export function createBoard(size: BoardSize = DEFAULT_BOARD_SIZE, tiles: Tile[] = EASTERN_TILE_SET): BoardCell[][] {
  const total = size.rows * size.cols;
  if (total % 2 !== 0) throw new Error("Board must have an even number of cells.");
  const pairCount = total / 2;
  if (tiles.length < pairCount) throw new Error(`Need at least ${pairCount} unique tiles.`);

  const shuffled = shuffleArray(tiles.slice(0, pairCount).flatMap((tile) => [tile, tile]));
  return Array.from({ length: size.rows }, (_, row) =>
    Array.from({ length: size.cols }, (_, col) => ({ tile: shuffled[row * size.cols + col], removed: false }))
  );
}

export function cloneBoard(board: BoardCell[][]): BoardCell[][] {
  return board.map((row) => row.map((cell) => ({ ...cell })));
}

export function remainingTiles(board: BoardCell[][]): number {
  return board.flat().filter((cell) => cell.tile && !cell.removed).length;
}

export function canMatch(board: BoardCell[][], a: Position, b: Position): MatchPath | null {
  if (samePosition(a, b) || !isInsideBoard(board, a) || !isInsideBoard(board, b)) return null;
  const first = board[a.row][a.col];
  const second = board[b.row][b.col];
  if (!first.tile || !second.tile || first.removed || second.removed || first.tile.id !== second.tile.id) return null;
  return findPath(board, a, b);
}

export function applyMatch(board: BoardCell[][], a: Position, b: Position): BoardCell[][] {
  const next = cloneBoard(board);
  next[a.row][a.col] = { ...next[a.row][a.col], removed: true };
  next[b.row][b.col] = { ...next[b.row][b.col], removed: true };
  return next;
}

export function findHint(board: BoardCell[][]): [Position, Position, MatchPath] | null {
  const positions: Position[] = [];
  board.forEach((row, rowIndex) =>
    row.forEach((cell, colIndex) => {
      if (cell.tile && !cell.removed) positions.push({ row: rowIndex, col: colIndex });
    })
  );

  for (let i = 0; i < positions.length; i += 1) {
    for (let j = i + 1; j < positions.length; j += 1) {
      const path = canMatch(board, positions[i], positions[j]);
      if (path) return [positions[i], positions[j], path];
    }
  }
  return null;
}

export function shuffleRemaining(board: BoardCell[][]): BoardCell[][] {
  const next = cloneBoard(board);
  const activeTiles = shuffleArray(
    next.flat().filter((cell) => cell.tile && !cell.removed).map((cell) => cell.tile as Tile)
  );
  let index = 0;
  next.forEach((row) =>
    row.forEach((cell) => {
      if (cell.tile && !cell.removed) {
        cell.tile = activeTiles[index];
        index += 1;
      }
    })
  );
  return next;
}

function findPath(board: BoardCell[][], start: Position, target: Position): MatchPath | null {
  const rows = board.length;
  const cols = board[0]?.length ?? 0;
  const startPoint = toPadded(start);
  const targetPoint = toPadded(target);
  const directions = [
    { row: -1, col: 0 },
    { row: 0, col: 1 },
    { row: 1, col: 0 },
    { row: 0, col: -1 }
  ];
  const queue = [{ point: startPoint, direction: -1, turns: 0, path: [startPoint] }];
  const bestTurns = new Map<string, number>();

  while (queue.length > 0) {
    const current = queue.shift();
    if (!current) break;

    for (let directionIndex = 0; directionIndex < directions.length; directionIndex += 1) {
      const direction = directions[directionIndex];
      const nextPoint = { row: current.point.row + direction.row, col: current.point.col + direction.col };
      if (!isInsidePadded(nextPoint, rows, cols)) continue;

      const nextTurns =
        current.direction === -1 || current.direction === directionIndex ? current.turns : current.turns + 1;

      // Classic Link Match permits a route made from at most three straight
      // segments, so the search stores direction and rejects paths after two
      // turns. A step is valid only through empty/removed cells, the selected
      // target, or the padded outside border that lets paths wrap around edges.
      if (nextTurns > 2 || !canPathOccupy(board, nextPoint, targetPoint)) continue;

      const key = `${nextPoint.row}:${nextPoint.col}:${directionIndex}`;
      if ((bestTurns.get(key) ?? Number.POSITIVE_INFINITY) <= nextTurns) continue;

      const nextPath = appendPathPoint(current.path, nextPoint, directionIndex, current.direction);
      if (samePoint(nextPoint, targetPoint)) return { points: nextPath, turns: nextTurns };

      bestTurns.set(key, nextTurns);
      queue.push({ point: nextPoint, direction: directionIndex, turns: nextTurns, path: nextPath });
    }
  }

  return null;
}

function canPathOccupy(board: BoardCell[][], paddedPoint: PathPoint, paddedTarget: PathPoint): boolean {
  if (samePoint(paddedPoint, paddedTarget)) return true;
  const point = fromPadded(paddedPoint);
  if (!isInsideBoard(board, point)) return true;
  const cell = board[point.row][point.col];
  return !cell.tile || cell.removed;
}

function appendPathPoint(path: PathPoint[], point: PathPoint, nextDirection: number, previousDirection: number) {
  if (previousDirection === -1) return [...path, point];
  if (nextDirection === previousDirection) return [...path.slice(0, -1), point];
  return [...path, point];
}

function toPadded(position: Position): PathPoint {
  return { row: position.row + 1, col: position.col + 1 };
}

function fromPadded(point: PathPoint): Position {
  return { row: point.row - 1, col: point.col - 1 };
}

function isInsideBoard(board: BoardCell[][], position: Position): boolean {
  return position.row >= 0 && position.row < board.length && position.col >= 0 && position.col < (board[0]?.length ?? 0);
}

function isInsidePadded(point: PathPoint, rows: number, cols: number): boolean {
  return point.row >= 0 && point.row <= rows + 1 && point.col >= 0 && point.col <= cols + 1;
}

function samePosition(a: Position, b: Position): boolean {
  return a.row === b.row && a.col === b.col;
}

function samePoint(a: PathPoint, b: PathPoint): boolean {
  return a.row === b.row && a.col === b.col;
}

function shuffleArray<T>(items: T[]): T[] {
  const next = [...items];
  for (let index = next.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [next[index], next[randomIndex]] = [next[randomIndex], next[index]];
  }
  return next;
}
