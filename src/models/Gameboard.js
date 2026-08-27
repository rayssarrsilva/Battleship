import createShip from './Ship';
import {
  isWithinBoard,
  coordKey,
  getShipCoordinates,
  randomCoordinate,
  randomDirection,
  BOARD_SIZE,
} from '../utils/coordinates';

/**
 * Gameboard factory.
 * Owns a 10x10 grid of ship placements, tracks hits/misses and reports
 * whether the whole fleet has been sunk.
 */
const createGameboard = () => {
  const shipPlacements = []; // { ship, coords: [[x, y], ...] }
  const attackedCoords = new Set();
  const missedAttacks = [];

  const occupiedCells = () =>
    new Set(shipPlacements.flatMap(({ coords }) => coords.map(coordKey)));

  const canPlaceShip = (coords) => {
    const occupied = occupiedCells();
    return coords.every(
      (coord) => isWithinBoard(coord) && !occupied.has(coordKey(coord))
    );
  };

  const placeShip = (length, start, direction = 'horizontal') => {
    const coords = getShipCoordinates(start, length, direction);

    if (!canPlaceShip(coords)) {
      throw new Error('Invalid ship placement');
    }

    const ship = createShip(length);
    shipPlacements.push({ ship, coords });
    return ship;
  };

  const placeShipsRandomly = (lengths) => {
    shipPlacements.length = 0;

    lengths.forEach((length) => {
      let placed = false;

      while (!placed) {
        const start = randomCoordinate();
        const direction = randomDirection();
        const coords = getShipCoordinates(start, length, direction);

        if (canPlaceShip(coords)) {
          const ship = createShip(length);
          shipPlacements.push({ ship, coords });
          placed = true;
        }
      }
    });
  };

  const findShipAt = (coord) =>
    shipPlacements.find(({ coords }) =>
      coords.some((c) => coordKey(c) === coordKey(coord))
    );

  const receiveAttack = (coord) => {
    if (!isWithinBoard(coord)) {
      throw new Error('Attack is out of bounds');
    }

    const key = coordKey(coord);
    if (attackedCoords.has(key)) {
      throw new Error('Coordinate already attacked');
    }
    attackedCoords.add(key);

    const placement = findShipAt(coord);

    if (placement) {
      placement.ship.hit();
      return { hit: true, sunk: placement.ship.isSunk() };
    }

    missedAttacks.push(coord);
    return { hit: false, sunk: false };
  };

  const allShipsSunk = () =>
    shipPlacements.length > 0 &&
    shipPlacements.every(({ ship }) => ship.isSunk());

  const hasBeenAttacked = (coord) => attackedCoords.has(coordKey(coord));

  const getMissedAttacks = () => [...missedAttacks];

  const getShipPlacements = () =>
    shipPlacements.map(({ ship, coords }) => ({ ship, coords: [...coords] }));

  return {
    boardSize: BOARD_SIZE,
    placeShip,
    placeShipsRandomly,
    receiveAttack,
    allShipsSunk,
    hasBeenAttacked,
    getMissedAttacks,
    getShipPlacements,
  };
};

export default createGameboard;
