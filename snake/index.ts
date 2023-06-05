import { runServer } from './server';
import { GameState, InfoResponse, MoveResponse } from '../types';

const info = (): InfoResponse => {
  console.log('Info');

  return {
    apiversion: '1',
    author: 'chattox',
    color: '#ff579f',
    head: 'trans-rights-scarf',
    tail: 'pixel',
  };
};

const start = (gameState: GameState): void => {
  console.log('Game start');
};

const end = (gameState: GameState): void => {
  console.log('Game end');
};

const move = (gameState: GameState): MoveResponse => {
  const isMoveSafe: { [key: string]: boolean } = {
    up: true,
    down: true,
    left: true,
    right: true,
  };

  // Prevent snake from moving backwards
  const selfHead = gameState.you.body[0];
  const selfNeck = gameState.you.body[1];

  if (selfNeck.x < selfHead.x) {
    isMoveSafe.left = false;
  } else if (selfNeck.x > selfHead.x) {
    isMoveSafe.right = false;
  } else if (selfNeck.y < selfHead.y) {
    isMoveSafe.down = false;
  } else if (selfNeck.y > selfHead.y) {
    isMoveSafe.up = false;
  }

  // Prevent from colliding with self

  const safeMoves = Object.keys(isMoveSafe).filter((key) => isMoveSafe[key]);
  if (safeMoves.length == 0) {
    console.log(`Move ${gameState.turn}: No safe moves detected, moving down`);
    return { move: 'down' };
  }

  const nextMove = safeMoves[Math.floor(Math.random() * safeMoves.length)];

  console.log(nextMove);

  console.log(`Move ${gameState.turn}: ${nextMove}`);
  return { move: nextMove };
};

runServer({
  info: info,
  start: start,
  move: move,
  end: end,
});
