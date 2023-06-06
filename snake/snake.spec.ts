import { mockGameState } from '../tests/mockGameState';
import { info, start, end, move } from './snake';

describe('snake', () => {
  describe('info', () => {
    it('returns expected info', () => {
      const result = info();

      expect(result.apiversion).toBe('1');
      expect(typeof result.author).toBe('string');
      expect(typeof result.color).toBe('string');
      expect(typeof result.head).toBe('string');
      expect(typeof result.tail).toBe('string');
      expect(typeof result.version).toBe('string');
    });
  });
  describe('start', () => {
    it('returns nothing', () => {
      const res = start();

      expect(res).toBeUndefined();
    });
  });
  describe('end', () => {
    it('returns nothing', () => {
      const res = end();

      expect(res).toBeUndefined();
    });
  });
  describe('move', () => {
    it('returns a valid move', () => {
      const res = move(mockGameState);
      const expected = ['up', 'down', 'left', 'right'];

      expect(expected).toContain(res.move);
    });
  });
});
