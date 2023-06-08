import { Coord, Distances } from '../types';

export const getDirCoord = (dir: string, cur: Coord): Coord => {
  switch (dir) {
    case 'up':
      return { x: cur.x, y: cur.y + 1 };
    case 'down':
      return { x: cur.x, y: cur.y - 1 };
    case 'left':
      return { x: cur.x - 1, y: cur.y };
    case 'right':
      return { x: cur.x + 1, y: cur.y };
    default:
      return cur;
  }
};

export const getDistance = (cur: Coord, targets: Coord[]): Distances[] => {
  const distances: Distances[] = [];

  targets.forEach((target) => {
    const xDist = Math.abs(cur.x - target.x);
    const yDist = Math.abs(cur.y - target.y);
    const distance = xDist + yDist;

    distances.push({ distance: distance, coord: target });
  });

  return distances;
};

export const getDirection = (cur: Coord, target: Coord): string => {
  if (cur.x > target.x) {
    return 'left';
  } else if (cur.x < target.x) {
    return 'right';
  } else if (cur.y > target.y) {
    return 'down';
  } else if (cur.y < target.y) {
    return 'up';
  } else {
    return 'unknown';
  }
};
