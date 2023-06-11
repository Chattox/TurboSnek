import { mockGameState } from '../tests/mockGameState';
import { GameState } from '../types';
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
      const res = end(mockGameState);

      expect(res).toBeUndefined();
    });
  });
  describe('move', () => {
    it('returns a valid move', () => {
      const res = move(mockGameState);
      const expected = ['up', 'down', 'left', 'right'];

      expect(expected).toContain(res.move);
    });
    it('returns "down" when no safe moves found', () => {
      const noSafeMovesState: GameState = JSON.parse(JSON.stringify(mockGameState));
      noSafeMovesState.you.body = [
        { x: 3, y: 3 },
        { x: 2, y: 3 },
        { x: 2, y: 2 },
        { x: 3, y: 2 },
        { x: 4, y: 2 },
        { x: 4, y: 3 },
        { x: 4, y: 4 },
        { x: 3, y: 4 },
      ];
      noSafeMovesState.you.head = { x: 3, y: 3 };
      const res = move(noSafeMovesState);

      expect(res).toEqual({ move: 'down' });
    });
  });
});
