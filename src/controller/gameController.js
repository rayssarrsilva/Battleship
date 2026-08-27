import createPlayer, { PLAYER_TYPES } from '../models/Player';
import {
  renderEmptyBoard,
  updateBoard,
  setBoardDisabled,
} from '../views/boardView';
import { setStatusMessage } from '../views/uiView';

const SHIP_LENGTHS = [5, 4, 3, 3, 2];

const createGameController = ({ playerBoardEl, computerBoardEl, statusEl }) => {
  let human;
  let computer;
  let gameOver;

  const render = () => {
    updateBoard(playerBoardEl, human.gameboard, { revealShips: true });
    updateBoard(computerBoardEl, computer.gameboard, { revealShips: false });
  };

  const endGameIfNeeded = () => {
    if (computer.gameboard.allShipsSunk()) {
      setStatusMessage(statusEl, 'You win! All enemy ships are sunk.');
      gameOver = true;
    } else if (human.gameboard.allShipsSunk()) {
      setStatusMessage(statusEl, 'You lose! Your fleet has been destroyed.');
      gameOver = true;
    }

    if (gameOver) {
      setBoardDisabled(computerBoardEl, true);
    }
  };

  const computerTurn = () => {
    if (gameOver) return;

    const { result } = computer.makeComputerMove(human.gameboard);
    render();
    endGameIfNeeded();

    if (!gameOver) {
      setStatusMessage(
        statusEl,
        result.hit ? 'The enemy hit your fleet!' : 'The enemy missed. Your turn.'
      );
    }
  };

  const handlePlayerAttack = (coord) => {
    if (gameOver || computer.gameboard.hasBeenAttacked(coord)) return;

    const result = human.attack(computer.gameboard, coord);
    render();
    endGameIfNeeded();

    if (!gameOver) {
      setStatusMessage(
        statusEl,
        result.hit ? 'Direct hit! Enemy is responding...' : 'You missed. Enemy is responding...'
      );
      setTimeout(computerTurn, 400);
    }
  };

  const startNewGame = () => {
    gameOver = false;
    human = createPlayer(PLAYER_TYPES.REAL);
    computer = createPlayer(PLAYER_TYPES.COMPUTER);

    human.gameboard.placeShipsRandomly(SHIP_LENGTHS);
    computer.gameboard.placeShipsRandomly(SHIP_LENGTHS);

    renderEmptyBoard(playerBoardEl);
    renderEmptyBoard(computerBoardEl, { onCellClick: handlePlayerAttack });
    setBoardDisabled(computerBoardEl, false);

    render();
    setStatusMessage(statusEl, 'Your turn: click a cell on the enemy board.');
  };

  return { startNewGame };
};

export default createGameController;
