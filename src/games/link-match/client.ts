import {
  applyMatch,
  canMatch,
  createBoard,
  DEFAULT_BOARD_SIZE,
  findHint,
  remainingTiles,
  shuffleRemaining,
  type BoardCell,
  type MatchPath,
  type Position
} from "./logic";

interface GameState {
  board: BoardCell[][];
  selected: Position | null;
  moves: number;
  shuffles: number;
  seconds: number;
  timerId: number | null;
  locked: boolean;
  won: boolean;
}

const root = document.querySelector<HTMLElement>("[data-link-match]");

if (root) {
  const boardElement = root.querySelector<HTMLElement>("[data-board]");
  const lineLayer = root.querySelector<SVGSVGElement>("[data-line-layer]");
  const timerElement = root.querySelector<HTMLElement>("[data-timer]");
  const movesElement = root.querySelector<HTMLElement>("[data-moves]");
  const remainingElement = root.querySelector<HTMLElement>("[data-remaining]");
  const shuffleCountElement = root.querySelector<HTMLElement>("[data-shuffles]");
  const messageElement = root.querySelector<HTMLElement>("[data-message]");
  const restartButton = root.querySelector<HTMLButtonElement>("[data-restart]");
  const hintButton = root.querySelector<HTMLButtonElement>("[data-hint]");
  const shuffleButton = root.querySelector<HTMLButtonElement>("[data-shuffle]");
  const winDialog = root.querySelector<HTMLDialogElement>("[data-win-dialog]");
  const winStats = root.querySelector<HTMLElement>("[data-win-stats]");
  const playAgainButton = root.querySelector<HTMLButtonElement>("[data-play-again]");

  if (
    boardElement &&
    lineLayer &&
    timerElement &&
    movesElement &&
    remainingElement &&
    shuffleCountElement &&
    messageElement &&
    restartButton &&
    hintButton &&
    shuffleButton &&
    winDialog &&
    winStats &&
    playAgainButton
  ) {
    let state: GameState;
    state = newGame();

    restartButton.addEventListener("click", () => {
      state = newGame();
      render();
    });
    playAgainButton.addEventListener("click", () => {
      winDialog.close();
      state = newGame();
      render();
    });
    hintButton.addEventListener("click", () => showHint());
    shuffleButton.addEventListener("click", () => shuffleBoard());
    boardElement.addEventListener("click", (event) => {
      const button = (event.target as HTMLElement).closest<HTMLButtonElement>("[data-cell]");
      if (!button || state.locked || state.won) return;
      handleCellClick({ row: Number(button.dataset.row), col: Number(button.dataset.col) });
    });

    render();

    function newGame(): GameState {
      if (state?.timerId) window.clearInterval(state.timerId);
      const next: GameState = {
        board: createBoard(DEFAULT_BOARD_SIZE),
        selected: null,
        moves: 0,
        shuffles: 0,
        seconds: 0,
        timerId: window.setInterval(() => {
          state.seconds += 1;
          renderStats();
        }, 1000),
        locked: false,
        won: false
      };
      return ensureSolvableStart(next);
    }

    function handleCellClick(position: Position): void {
      const cell = state.board[position.row][position.col];
      if (!cell.tile || cell.removed) return;
      if (!state.selected) {
        state.selected = position;
        setMessage("Select a matching tile with a clear path.");
        render();
        return;
      }
      if (state.selected.row === position.row && state.selected.col === position.col) {
        state.selected = null;
        render();
        return;
      }

      state.moves += 1;
      const path = canMatch(state.board, state.selected, position);
      if (!path) {
        state.selected = position;
        setMessage("That pair is blocked. Try another matching tile.");
        render();
        return;
      }

      const first = state.selected;
      state.selected = null;
      state.locked = true;
      render();
      drawPath(path);
      window.setTimeout(() => {
        state.board = applyMatch(state.board, first, position);
        state.locked = false;
        clearPath();
        checkProgress();
        render();
      }, 260);
    }

    function checkProgress(): void {
      const left = remainingTiles(state.board);
      if (left === 0) {
        state.won = true;
        if (state.timerId) window.clearInterval(state.timerId);
        state.timerId = null;
        winStats.textContent = `Time ${formatTime(state.seconds)} · Moves ${state.moves} · Shuffles ${state.shuffles}`;
        winDialog.showModal();
        setMessage("Puzzle cleared.");
      } else if (!findHint(state.board)) {
        setMessage("No available pair right now. Use Shuffle to continue.");
      } else {
        setMessage("Nice match. Keep going.");
      }
    }

    function showHint(): void {
      if (state.locked || state.won) return;
      const hint = findHint(state.board);
      if (!hint) {
        setMessage("No available pair. Shuffle will only move remaining tiles.");
        return;
      }
      const [first, second, path] = hint;
      getCellButton(first)?.classList.add("is-hint");
      getCellButton(second)?.classList.add("is-hint");
      drawPath(path);
      setMessage("Hint highlighted for one second.");
      window.setTimeout(() => {
        getCellButton(first)?.classList.remove("is-hint");
        getCellButton(second)?.classList.remove("is-hint");
        clearPath();
      }, 1000);
    }

    function shuffleBoard(): void {
      if (state.locked || state.won) return;
      state.board = shuffleRemaining(state.board);
      state.selected = null;
      state.shuffles += 1;
      setMessage(findHint(state.board) ? "Remaining tiles shuffled." : "Still no pair. Shuffle once more.");
      render();
    }

    function render(): void {
      renderBoard();
      renderStats();
    }

    function renderBoard(): void {
      boardElement.innerHTML = "";
      boardElement.style.setProperty("--rows", String(DEFAULT_BOARD_SIZE.rows));
      boardElement.style.setProperty("--cols", String(DEFAULT_BOARD_SIZE.cols));
      state.board.forEach((row, rowIndex) =>
        row.forEach((cell, colIndex) => {
          const button = document.createElement("button");
          button.type = "button";
          button.className = "tile-button";
          button.dataset.cell = "";
          button.dataset.row = String(rowIndex);
          button.dataset.col = String(colIndex);
          button.setAttribute("aria-label", cell.tile ? cell.tile.label : "Empty tile space");
          if (!cell.tile || cell.removed) {
            button.classList.add("is-empty");
            button.disabled = true;
          } else {
            button.textContent = cell.tile.symbol;
          }
          if (state.selected?.row === rowIndex && state.selected.col === colIndex) button.classList.add("is-selected");
          boardElement.append(button);
        })
      );
    }

    function renderStats(): void {
      timerElement.textContent = formatTime(state.seconds);
      movesElement.textContent = String(state.moves);
      remainingElement.textContent = String(remainingTiles(state.board));
      shuffleCountElement.textContent = String(state.shuffles);
    }

    function drawPath(path: MatchPath): void {
      const rect = boardElement.getBoundingClientRect();
      const cellWidth = rect.width / DEFAULT_BOARD_SIZE.cols;
      const cellHeight = rect.height / DEFAULT_BOARD_SIZE.rows;
      const points = path.points.map((point) => `${(point.col - 0.5) * cellWidth},${(point.row - 0.5) * cellHeight}`).join(" ");
      lineLayer.setAttribute("viewBox", `0 0 ${rect.width} ${rect.height}`);
      lineLayer.innerHTML = `<polyline class="match-line" points="${points}" />`;
    }

    function clearPath(): void {
      lineLayer.innerHTML = "";
    }

    function getCellButton(position: Position): HTMLButtonElement | null {
      return boardElement.querySelector(`[data-cell][data-row="${position.row}"][data-col="${position.col}"]`);
    }

    function setMessage(message: string): void {
      messageElement.textContent = message;
    }
  }
}

function ensureSolvableStart(state: GameState): GameState {
  let attempts = 0;
  while (!findHint(state.board) && attempts < 20) {
    state.board = shuffleRemaining(state.board);
    attempts += 1;
  }
  return state;
}

function formatTime(totalSeconds: number): string {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}
