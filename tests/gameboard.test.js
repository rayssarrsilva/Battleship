import createGameboard from '../src/models/Gameboard';

describe('Gameboard factory', () => {
  test('places a ship at specific coordinates', () => {
    const gameboard = createGameboard();
    const ship = gameboard.placeShip(3, [0, 0], 'horizontal');
    expect(ship.length).toBe(3);
    expect(gameboard.getShipPlacements()).toHaveLength(1);
  });

  test('throws when placing a ship out of bounds', () => {
    const gameboard = createGameboard();
    expect(() => gameboard.placeShip(4, [8, 0], 'horizontal')).toThrow();
  });

  test('throws when placing overlapping ships', () => {
    const gameboard = createGameboard();
    gameboard.placeShip(3, [0, 0], 'horizontal');
    expect(() => gameboard.placeShip(2, [1, 0], 'vertical')).toThrow();
  });

  test('receiveAttack registers a hit on a ship and reports sunk status', () => {
    const gameboard = createGameboard();
    gameboard.placeShip(1, [2, 2], 'horizontal');

    const result = gameboard.receiveAttack([2, 2]);
    expect(result).toEqual({ hit: true, sunk: true });
  });

  test('receiveAttack records a missed shot when no ship is present', () => {
    const gameboard = createGameboard();
    gameboard.placeShip(1, [0, 0], 'horizontal');

    const result = gameboard.receiveAttack([5, 5]);
    expect(result).toEqual({ hit: false, sunk: false });
    expect(gameboard.getMissedAttacks()).toContainEqual([5, 5]);
  });

  test('throws when the same coordinate is attacked twice', () => {
    const gameboard = createGameboard();
    gameboard.receiveAttack([1, 1]);
    expect(() => gameboard.receiveAttack([1, 1])).toThrow();
  });

  test('allShipsSunk() is false until every ship is sunk', () => {
    const gameboard = createGameboard();
    gameboard.placeShip(1, [0, 0], 'horizontal');
    gameboard.placeShip(1, [1, 1], 'horizontal');

    gameboard.receiveAttack([0, 0]);
    expect(gameboard.allShipsSunk()).toBe(false);

    gameboard.receiveAttack([1, 1]);
    expect(gameboard.allShipsSunk()).toBe(true);
  });

  test('placeShipsRandomly places every requested ship without overlap', () => {
    const gameboard = createGameboard();
    gameboard.placeShipsRandomly([5, 4, 3, 3, 2]);
    expect(gameboard.getShipPlacements()).toHaveLength(5);
  });

  test('hasBeenAttacked reflects previous attacks', () => {
    const gameboard = createGameboard();
    expect(gameboard.hasBeenAttacked([3, 3])).toBe(false);
    gameboard.receiveAttack([3, 3]);
    expect(gameboard.hasBeenAttacked([3, 3])).toBe(true);
  });
});
