import { Coord } from '../types';

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
