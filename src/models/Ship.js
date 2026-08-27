const createShip = (length) => {
  if (!Number.isInteger(length) || length <= 0) {
    throw new Error('Ship length must be a positive integer');
  }

  let hits = 0;

  const hit = () => {
    if (hits < length) {
      hits += 1;
    }
  };

  const isSunk = () => hits >= length;

  const getHits = () => hits;

  return {
    length,
    hit,
    isSunk,
    getHits,
  };
};

export default createShip;
