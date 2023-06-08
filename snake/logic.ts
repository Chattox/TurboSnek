import { GameState } from '../types';
import { getDirCoord, getDirection, getDistance } from '../utils/utils';

type MoveDirections = Record<string, boolean>;

export const getSafeMoves = (gameState: GameState): string[] => {
  const isMoveSafe: MoveDirections = {
    up: true,
    down: true,
    left: true,
    right: true,
  };

  const selfHead = gameState.you.body[0];
  const selfNeck = gameState.you.body[1];

  const boardWidth = gameState.board.width;
  const boardHeight = gameState.board.height;

  Object.keys(isMoveSafe).forEach((direction: string) => {
    const targetMove = getDirCoord(direction, selfHead);

    // Prevent from moving backwards
    if (targetMove.x === selfNeck.x && targetMove.y === selfNeck.y) {
      isMoveSafe[direction] = false;
    }

    // Prevent from going out of bounds
    if (
      targetMove.x < 0 ||
      targetMove.x > boardWidth - 1 ||
      targetMove.y < 0 ||
      targetMove.y > boardHeight - 1
    ) {
      isMoveSafe[direction] = false;
    }

    // Prevent from colliding with own body
    // TODO prevent getting into dead ends created by own body
    gameState.you.body.forEach((segment) => {
      if (targetMove.x === segment.x && targetMove.y === segment.y) {
        isMoveSafe[direction] = false;
      }
    });
  });

  return Object.keys(isMoveSafe).filter((key) => isMoveSafe[key]);
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
