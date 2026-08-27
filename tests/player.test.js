import createPlayer, { PLAYER_TYPES } from '../src/models/Player';

describe('Player factory', () => {
  test('creates a player with its own gameboard', () => {
    const player = createPlayer(PLAYER_TYPES.REAL);
    expect(player.gameboard).toBeDefined();
    expect(player.gameboard.getShipPlacements()).toEqual([]);
  });

  test('attack() forwards the coordinate to the opponent gameboard', () => {
    const attacker = createPlayer(PLAYER_TYPES.REAL);
    const opponent = createPlayer(PLAYER_TYPES.REAL);
    opponent.gameboard.placeShip(1, [4, 4], 'horizontal');

    const result = attacker.attack(opponent.gameboard, [4, 4]);
    expect(result).toEqual({ hit: true, sunk: true });
  });

  test('a computer player makes only legal, non-repeating moves', () => {
    const computer = createPlayer(PLAYER_TYPES.COMPUTER);
    const opponent = createPlayer(PLAYER_TYPES.REAL);

    const seen = new Set();
    for (let i = 0; i < 15; i += 1) {
      const { coord } = computer.makeComputerMove(opponent.gameboard);
      const key = `${coord[0]},${coord[1]}`;
      expect(seen.has(key)).toBe(false);
      seen.add(key);
    }
  });

  test('a non-computer player cannot call makeComputerMove', () => {
    const human = createPlayer(PLAYER_TYPES.REAL);
    const opponent = createPlayer(PLAYER_TYPES.REAL);
    expect(() => human.makeComputerMove(opponent.gameboard)).toThrow();
  });
});
