import { GameState } from '../types';
import { getDirCoord } from '../utils/utils';

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
    const targetCoord = getDirCoord(direction, selfHead);

    // Prevent from moving backwards
    if (targetCoord.x === selfNeck.x && targetCoord.y === selfNeck.y) {
      isMoveSafe[direction] = false;
    }

    // Prevent from going out of bounds
    if (
      targetCoord.x < 0 ||
      targetCoord.x > boardWidth - 1 ||
      targetCoord.y < 0 ||
      targetCoord.y > boardHeight - 1
    ) {
      isMoveSafe[direction] = false;
    }

    // Prevent from colliding with own body
    // TODO prevent getting into dead ends created by own body
    gameState.you.body.forEach((segment) => {
      if (targetCoord.x === segment.x && targetCoord.y === segment.y) {
        isMoveSafe[direction] = false;
      }
    });
  });

  return Object.keys(isMoveSafe).filter((key) => isMoveSafe[key]);
};
