import { getDirCoord, getDirection, getDistance } from './utils';
import { Coord } from '../types';

describe('utils', () => {
  describe('getDirCoords', () => {
    const testCoord: Coord = { x: 2, y: 2 };
    it('should return correct new Coord for up direction', () => {
      const result = getDirCoord('up', testCoord);
      const expected: Coord = { x: 2, y: 3 };
      expect(result).toEqual(expected);
    });
    it('should return correct new Coord for down direction', () => {
      const result = getDirCoord('down', testCoord);
      const expected: Coord = { x: 2, y: 1 };
      expect(result).toEqual(expected);
    });
    it('should return correct new Coord for left direction', () => {
      const result = getDirCoord('left', testCoord);
      const expected: Coord = { x: 1, y: 2 };
      expect(result).toEqual(expected);
    });
    it('should return correct new Coord for right direction', () => {
      const result = getDirCoord('right', testCoord);
      const expected: Coord = { x: 3, y: 2 };
      expect(result).toEqual(expected);
    });
    it('should return Coord with unaltered coord if given invalid direction', () => {
      const result = getDirCoord('derp', testCoord);
      const expected: Coord = { x: 2, y: 2 };
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

  describe('getDirection', () => {
    it('returns string of direction to target Coord from current Coord', () => {
      const current: Coord = { x: 3, y: 3 };
      const targets = [
        { direction: 'left', coord: { x: 2, y: 3 } },
        { direction: 'right', coord: { x: 4, y: 3 } },
        { direction: 'up', coord: { x: 3, y: 4 } },
        { direction: 'down', coord: { x: 3, y: 2 } },
      ];

      targets.forEach((target) => {
        expect(getDirection(current, target.coord)).toEqual(target.direction);
      });
    });
    it('returns "unknown" if cant find direction e.g. cur and target are the same', () => {
      const current: Coord = { x: 3, y: 3 };
      const target: Coord = { x: 3, y: 3 };

      expect(getDirection(current, target)).toEqual('unknown');
    });
  });
});
