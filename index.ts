import { info, start, end, move } from './snake/snake';
import { runServer } from './snake/server';

runServer({
  info: info,
  start: start,
  end: end,
  move: move,
});
