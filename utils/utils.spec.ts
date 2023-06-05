import { getDirCoord } from './index';
import { Coord } from '../types';

describe('getDirCoords', () => {
  const testCoord: Coord = { x: 2, y: 2 };
  it('should return correct new coord for up direction', () => {
    const result = getDirCoord('up', testCoord);
    const expected: Coord = { x: 2, y: 3 };
    expect(result).toEqual(expected);
  });
  it('should return corrext new coord for down direction', () => {
    const result = getDirCoord('down', testCoord);
    const expected: Coord = { x: 2, y: 1 };
    expect(result).toEqual(expected);
  });
  it('should return correct new coord for left direction', () => {
    const result = getDirCoord('left', testCoord);
    const expected: Coord = { x: 1, y: 2 };
    expect(result).toEqual(expected);
  });
  it('should return correct new coord for right direction', () => {
    const result = getDirCoord('right', testCoord);
    const expected: Coord = { x: 3, y: 2 };
    expect(result).toEqual(expected);
  });
  it('should return unaltered coord if given invalid direction', () => {
    const result = getDirCoord('derp', testCoord);
    expect(result).toEqual(testCoord);
  });
});
