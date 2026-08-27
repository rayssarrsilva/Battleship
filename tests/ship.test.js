import createShip from '../src/models/Ship';

describe('Ship factory', () => {
  test('creates a ship with the given length and zero hits', () => {
    const ship = createShip(3);
    expect(ship.length).toBe(3);
    expect(ship.getHits()).toBe(0);
  });

  test('hit() increases the number of hits', () => {
    const ship = createShip(3);
    ship.hit();
    expect(ship.getHits()).toBe(1);
  });

  test('isSunk() returns false while hits are below length', () => {
    const ship = createShip(3);
    ship.hit();
    ship.hit();
    expect(ship.isSunk()).toBe(false);
  });

  test('isSunk() returns true once hits reach length', () => {
    const ship = createShip(2);
    ship.hit();
    ship.hit();
    expect(ship.isSunk()).toBe(true);
  });

  test('hits never exceed the ship length', () => {
    const ship = createShip(1);
    ship.hit();
    ship.hit();
    ship.hit();
    expect(ship.getHits()).toBe(1);
    expect(ship.isSunk()).toBe(true);
  });

  test('throws for an invalid length', () => {
    expect(() => createShip(0)).toThrow();
    expect(() => createShip(-2)).toThrow();
  });
});
