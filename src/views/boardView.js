import { BOARD_SIZE } from '../utils/coordinates';

export const renderEmptyBoard = (container, { onCellClick } = {}) => {
  container.innerHTML = '';
  container.style.setProperty('--board-size', BOARD_SIZE);

  for (let y = 0; y < BOARD_SIZE; y += 1) {
    for (let x = 0; x < BOARD_SIZE; x += 1) {
      const cell = document.createElement('button');
      cell.type = 'button';
      cell.classList.add('cell');
      cell.dataset.x = x;
      cell.dataset.y = y;

      if (onCellClick) {
        cell.addEventListener('click', () => onCellClick([x, y]));
      }

      container.appendChild(cell);
    }
  }
};

const getCell = (container, [x, y]) =>
  container.querySelector(`.cell[data-x="${x}"][data-y="${y}"]`);

export const updateBoard = (container, gameboard, { revealShips }) => {
  const shipCells = new Set();

  gameboard.getShipPlacements().forEach(({ ship, coords }) => {
    coords.forEach((coord, index) => {
      const cell = getCell(container, coord);
      if (!cell) return;

      shipCells.add(cell);
      const wasHit = index < ship.getHits();

      cell.classList.toggle('cell--ship', revealShips && !wasHit);
      cell.classList.toggle('cell--hit', wasHit);
      cell.classList.toggle('cell--sunk', ship.isSunk());
    });
  });

  gameboard.getMissedAttacks().forEach((coord) => {
    const cell = getCell(container, coord);
    if (cell) cell.classList.add('cell--miss');
  });
};

export const setBoardDisabled = (container, disabled) => {
  container.classList.toggle('board--disabled', disabled);
};
