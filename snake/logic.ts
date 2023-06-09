import { GameState } from '../types';
import { checkSafe, getDirCoord, getDirection, getDistance } from '../utils/utils';

export const getSafeMoves = (gameState: GameState): string[] => {
  const headPos = gameState.you.head;
  const safeMoves = checkSafe(headPos, gameState);
  const result: string[] = [];

  safeMoves.forEach((move) => {
    const moveCoord = getDirCoord(move, headPos);
    if (checkSafe(moveCoord, gameState).length > 1) {
      result.push(move);
    } else {
      console.log('DEAD END DETECTED');
    }
  });

  return result;
};

export const seekFood = (gameState: GameState, safeMoves: string[]): string[] => {
  const safeMoveCoords = safeMoves.map((move) => getDirCoord(move, gameState.you.head));
  const distances = getDistance(gameState.you.head, gameState.board.food);

  distances.sort((a, b) => a.distance - b.distance);
  const targetFood = distances[0].coord;
  const foodwardMoves = getDistance(targetFood, safeMoveCoords);
  foodwardMoves.sort((a, b) => a.distance - b.distance);

  const direction = getDirection(gameState.you.head, foodwardMoves[0].coord);

  return [direction];
};
