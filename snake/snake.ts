import { GameState, InfoResponse, MoveResponse } from '../types';
import { getSafeMoves, opportunisticMurder, seekFood } from './logic';

export const info = (): InfoResponse => {
  const snakeInfo = {
    apiversion: '1',
    author: 'chattox',
    color: '#ff579f',
    head: 'trans-rights-scarf',
    tail: 'do-sammy',
    version: '0.1.0',
  };
  console.log('Info');
  console.log(snakeInfo);

  return snakeInfo;
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

  const murderOpportunity = opportunisticMurder(gameState, gameState.you.head);

  if (murderOpportunity) {
    return { move: murderOpportunity };
  } else if (gameState.you.health < 50) {
    return { move: seekFood(gameState, safeMoves)[0] };
  } else {
    return { move: safeMoves[Math.floor(Math.random() * safeMoves.length)] };
  }
};
