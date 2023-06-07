import { getDirCoord, getDistance } from './utils';
import { Coord, Move } from '../types';

describe('utils', () => {
  describe('getDirCoords', () => {
    const testCoord: Coord = { x: 2, y: 2 };
    it('should return correct new Move for up direction', () => {
      const result = getDirCoord('up', testCoord);
      const expected: Move = { direction: 'up', coord: { x: 2, y: 3 } };
      expect(result).toEqual(expected);
    });
    it('should return correct new Move for down direction', () => {
      const result = getDirCoord('down', testCoord);
      const expected: Move = { direction: 'down', coord: { x: 2, y: 1 } };
      expect(result).toEqual(expected);
    });
    it('should return correct new Move for left direction', () => {
      const result = getDirCoord('left', testCoord);
      const expected: Move = { direction: 'left', coord: { x: 1, y: 2 } };
      expect(result).toEqual(expected);
    });
    it('should return correct new Move for right direction', () => {
      const result = getDirCoord('right', testCoord);
      const expected: Move = { direction: 'right', coord: { x: 3, y: 2 } };
      expect(result).toEqual(expected);
    });
    it('should return Move with unaltered coord if given invalid direction', () => {
      const result = getDirCoord('derp', testCoord);
      const expected: Move = { direction: 'derp', coord: { x: 2, y: 2 } };
      expect(result).toEqual(expected);
    });
  });

  describe('getDistance', () => {
    it('returns array of distances between current and targets', () => {
      const current: Coord = { x: 3, y: 3 };
      const targets: Coord[] = [
        { x: 2, y: 1 },
        { x: 5, y: 5 },
        { x: 1, y: 27 },
      ];
      const expected = [
        { distance: 3, coord: { x: 2, y: 1 } },
        { distance: 4, coord: { x: 5, y: 5 } },
        { distance: 26, coord: { x: 1, y: 27 } },
      ];
      const result = getDistance(current, targets);

      expect(result).toEqual(expected);
    });
  });
});
