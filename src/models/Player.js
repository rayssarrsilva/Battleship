import createGameboard from './Gameboard';
import { coordKey, randomCoordinate } from '../utils/coordinates';

export const PLAYER_TYPES = {
  REAL: 'real',
  COMPUTER: 'computer',
};

/**
 * Player factory.
 * Every player (human or computer) owns a gameboard. Computer players
 * additionally know how to generate a legal random attack against an
 * opponent's board (never repeating a coordinate).
 */
const createPlayer = (type = PLAYER_TYPES.REAL) => {
  const gameboard = createGameboard();
  const previousComputerMoves = new Set();

  const attack = (opponentGameboard, coord) => opponentGameboard.receiveAttack(coord);

  const getRandomLegalMove = (opponentGameboard) => {
    let coord;
    let key;

    do {
      coord = randomCoordinate();
      key = coordKey(coord);
    } while (
      previousComputerMoves.has(key) ||
      opponentGameboard.hasBeenAttacked(coord)
    );

    previousComputerMoves.add(key);
    return coord;
  };

  const makeComputerMove = (opponentGameboard) => {
    if (type !== PLAYER_TYPES.COMPUTER) {
      throw new Error('Only computer players can make automatic moves');
    }
    const coord = getRandomLegalMove(opponentGameboard);
    return { coord, result: attack(opponentGameboard, coord) };
  };

  return {
    type,
    gameboard,
    attack,
    makeComputerMove,
  };
};

export default createPlayer;
