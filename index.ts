import { info, start, end, move } from './snake/index';
import { runServer } from './snake/server';

runServer({
  info: info,
  start: start,
  end: end,
  move: move,
});
