import { GameState, InfoResponse, MoveResponse } from '../types';
import { getSafeMoves } from './logic';

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
  const safeMoves = getSafeMoves(gameState);

  if (safeMoves.length == 0) {
    console.log(`Move ${gameState.turn}: No safe moves detected, moving down`);
    return { move: 'down' };
  }

  const nextMove = safeMoves[Math.floor(Math.random() * safeMoves.length)];

  console.log(`Move ${gameState.turn}: ${nextMove}`);
  return { move: nextMove };
};
