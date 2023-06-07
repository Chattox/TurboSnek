import { Coord, Distances, Move } from '../types';

export const getDirection = (dir: string, cur: Coord): Move => {
  switch (dir) {
    case 'up':
      return { direction: dir, coord: { x: cur.x, y: cur.y + 1 } };
    case 'down':
      return { direction: dir, coord: { x: cur.x, y: cur.y - 1 } };
    case 'left':
      return { direction: dir, coord: { x: cur.x - 1, y: cur.y } };
    case 'right':
      return { direction: dir, coord: { x: cur.x + 1, y: cur.y } };
    default:
      return { direction: dir, coord: cur };
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
