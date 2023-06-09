import { GameState } from '../types';
import { mockGameState } from '../tests/mockGameState';
import { getSafeMoves, seekFood } from './logic';

describe('logic', () => {
  describe('object avoidance', () => {
    it('avoids moving backwards', () => {
      const res = getSafeMoves(mockGameState);
      const backwardsMove = 'right';

      expect(res).not.toContain(backwardsMove);
    });

    it('avoids going out of bounds', () => {
      const res = getSafeMoves(mockGameState);
      const outOfBoundsMoves = ['down', 'left'];

      expect(res.some((direction) => outOfBoundsMoves.includes(direction))).toBeFalsy();
    });

    it('avoids colliding with self', () => {
      const selfCollisionGameState: GameState = JSON.parse(JSON.stringify(mockGameState));
      selfCollisionGameState.you.body = [
        { x: 3, y: 3 },
        { x: 3, y: 2 },
        { x: 2, y: 2 },
        { x: 2, y: 3 },
      ];
      selfCollisionGameState.you.head = { x: 3, y: 3 };
      const res = getSafeMoves(selfCollisionGameState);
      const selfCollideMoves = ['down', 'left'];

      expect(res.some((direction) => selfCollideMoves.includes(direction))).toBeFalsy();
    });

    it('avoids colliding with other snakes', () => {
      const otherSnakesGameState: GameState = JSON.parse(JSON.stringify(mockGameState));
      otherSnakesGameState.you.body = [
        { x: 3, y: 3 },
        { x: 2, y: 3 },
      ];
      otherSnakesGameState.you.head = { x: 3, y: 3 };
      otherSnakesGameState.board.snakes[1].body = [
        { x: 4, y: 3 },
        { x: 5, y: 3 },
      ];
      otherSnakesGameState.board.snakes[1].head = { x: 5, y: 3 };

      expect(getSafeMoves(otherSnakesGameState)).not.toContain('right');
    });

    it('does not avoid other snake heads (to eliminate them)', () => {
      const otherSnakesGameState: GameState = JSON.parse(JSON.stringify(mockGameState));
      otherSnakesGameState.you.body = [
        { x: 3, y: 3 },
        { x: 2, y: 3 },
      ];
      otherSnakesGameState.you.head = { x: 3, y: 3 };
      otherSnakesGameState.board.snakes[1].body = [
        { x: 4, y: 3 },
        { x: 5, y: 3 },
      ];
      otherSnakesGameState.board.snakes[1].head = { x: 4, y: 3 };

      expect(getSafeMoves(otherSnakesGameState)).toContain('right');
    });

    it('avoids dead ends 1 space away', () => {
      const oneSpaceDeadEndState: GameState = JSON.parse(JSON.stringify(mockGameState));
      oneSpaceDeadEndState.you.body = [
        { x: 3, y: 3 },
        { x: 2, y: 3 },
        { x: 2, y: 4 },
        { x: 3, y: 4 },
        { x: 4, y: 4 },
        { x: 5, y: 4 },
        { x: 5, y: 3 },
        { x: 5, y: 2 },
        { x: 4, y: 2 },
      ];
      oneSpaceDeadEndState.you.head = { x: 3, y: 3 };

      expect(getSafeMoves(oneSpaceDeadEndState)).toEqual(['down']);
    });
  });
  describe('seek food', () => {
    it('will move towards closest food', () => {
      const seekFoodState: GameState = JSON.parse(JSON.stringify(mockGameState));
      seekFoodState.you.body = [
        { x: 3, y: 3 },
        { x: 3, y: 2 },
        { x: 3, y: 1 },
      ];
      seekFoodState.you.head = { x: 3, y: 3 };
      seekFoodState.board.food = [{ x: 5, y: 3 }];
      const safeMoves = ['up', 'left', 'right'];
      const res = seekFood(seekFoodState, safeMoves);
      const expected = 'right';
      expect(res[0]).toEqual(expected);
    });
  });
});
