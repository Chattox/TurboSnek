import { Coord, Distances, GameState, MoveDirections } from '../types';

export const getDirCoord = (dir: string, cur: Coord): Coord => {
  switch (dir) {
    case 'up':
      return { x: cur.x, y: cur.y + 1 };
    case 'down':
      return { x: cur.x, y: cur.y - 1 };
    case 'left':
      return { x: cur.x - 1, y: cur.y };
    case 'right':
      return { x: cur.x + 1, y: cur.y };
    default:
      return cur;
  }
};

export const getDistance = (cur: Coord, targets: Coord[]): Distances[] => {
  const distances: Distances[] = [];

  targets.forEach((target) => {
    const xDist = Math.abs(cur.x - target.x);
    const yDist = Math.abs(cur.y - target.y);
    const distance = xDist + yDist;

    distances.push({ distance: distance, coord: target });
  });

  return distances;
};

export const getDirection = (cur: Coord, target: Coord): string => {
  if (cur.x > target.x) {
    return 'left';
  } else if (cur.x < target.x) {
    return 'right';
  } else if (cur.y > target.y) {
    return 'down';
  } else if (cur.y < target.y) {
    return 'up';
  } else {
    return 'unknown';
  }
};

export const checkSafe = (cur: Coord, gameState: GameState): string[] => {
  const isMoveSafe: MoveDirections = {
    up: true,
    down: true,
    left: true,
    right: true,
  };

  const selfNeck = gameState.you.body[1];

  const boardWidth = gameState.board.width;
  const boardHeight = gameState.board.height;

  Object.keys(isMoveSafe).forEach((direction: string) => {
    const targetMove = getDirCoord(direction, cur);

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

    // Prevent from colliding with other snakes
    gameState.board.snakes.forEach((snake) => {
      snake.body.forEach((segment) => {
        if (targetMove.x === segment.x && targetMove.y === segment.y) {
          isMoveSafe[direction] = false;
        }
      });
      if (targetMove.x === snake.head.x && targetMove.y === snake.head.y) {
        isMoveSafe[direction] = true;
      }
    });
  });
  return Object.keys(isMoveSafe).filter((key) => isMoveSafe[key]);
};
