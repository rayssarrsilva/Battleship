export const BOARD_SIZE = 10;

export const isWithinBoard = ([x, y]) =>
  x >= 0 && x < BOARD_SIZE && y >= 0 && y < BOARD_SIZE;

export const coordKey = ([x, y]) => `${x},${y}`;

export const getShipCoordinates = (start, length, direction) => {
  const [x, y] = start;
  const coords = [];

  for (let i = 0; i < length; i += 1) {
    if (direction === 'horizontal') {
      coords.push([x + i, y]);
    } else {
      coords.push([x, y + i]);
    }
  }

  return coords;
};

export const randomCoordinate = () => [
  Math.floor(Math.random() * BOARD_SIZE),
  Math.floor(Math.random() * BOARD_SIZE),
];

export const randomDirection = () =>
  Math.random() < 0.5 ? 'horizontal' : 'vertical';
