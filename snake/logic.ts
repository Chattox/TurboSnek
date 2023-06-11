import { Coord, GameState } from '../types';
import { checkSafe, getDirCoord, getDirection, getDistance } from '../utils/utils';

export const getSafeMoves = (gameState: GameState): string[] => {
  const headPos = gameState.you.head;
  const safeMoves = checkSafe(headPos, gameState);
  const result: string[] = [];

  safeMoves.forEach((move) => {
    const moveCoord = getDirCoord(move, headPos);
    if (checkSafe(moveCoord, gameState).length > 1) {
      result.push(move);
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

export const opportunisticMurder = (gameState: GameState, cur: Coord): string => {
  let res = '';
  ['left', 'right', 'down', 'up'].forEach((direction) => {
    if (res) {
      return;
    }
    const coord = getDirCoord(direction, cur);
    gameState.board.snakes.forEach((snake) => {
      if (coord.x === snake.head.x && coord.y === snake.head.y) {
        res = direction;
        return;
      }
    });
  });
  return res;
};
