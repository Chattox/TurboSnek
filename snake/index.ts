import { GameState, InfoResponse, MoveResponse } from '../types';
import { getDirCoord } from '../utils/index';

export const info = (): InfoResponse => {
  console.log('Info');

  return {
    apiversion: '1',
    author: 'chattox',
    color: '#ff579f',
    head: 'trans-rights-scarf',
    tail: 'pixel',
    version: '0.0.1-alpha',
  };
};

export const start = (): void => {
  console.log('Game start');
};

export const end = (): void => {
  console.log('Game end');
};

export const move = (gameState: GameState): MoveResponse => {
  const isMoveSafe: { [key: string]: boolean } = {
    up: true,
    down: true,
    left: true,
    right: true,
  };

  // Prevent snake from moving backwards
  const selfHead = gameState.you.body[0];
  const selfNeck = gameState.you.body[1];

  Object.keys(isMoveSafe).forEach((direction) => {
    const targetCoord = getDirCoord(direction, selfHead);
    // Prevent from moving backwards
    if (targetCoord.x === selfNeck.x && targetCoord.y === selfNeck.y) {
      isMoveSafe[direction] = false;
    }
    // Prevent from going out of bounds
  });

  const safeMoves = Object.keys(isMoveSafe).filter((key) => isMoveSafe[key]);
  if (safeMoves.length == 0) {
    console.log(`Move ${gameState.turn}: No safe moves detected, moving down`);
    return { move: 'down' };
  }

  const nextMove = safeMoves[Math.floor(Math.random() * safeMoves.length)];

  console.log(`Move ${gameState.turn}: ${nextMove}`);
  return { move: nextMove };
};
