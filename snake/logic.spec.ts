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
