import express, { Request, Response, NextFunction } from 'express';
import { BattlesnakeHandlers } from '../types';

export const runServer = (handlers: BattlesnakeHandlers) => {
  const app = express();
  app.use(express.json());

  app.get('/', (req: Request, res: Response) => {
    res.send(handlers.info());
  });

  app.post('/start', (req: Request, res: Response) => {
    handlers.start();
    res.send('ok');
  });

  app.post('/move', (req: Request, res: Response) => {
    res.send(handlers.move(req.body));
  });

  app.post('/end', (req: Request, res: Response) => {
    handlers.end();
    res.send('ok');
  });

  app.use(function (req: Request, res: Response, next: NextFunction) {
    res.set('Server', 'chattox/github/turbosnek');
    next();
  });

  const host = '0.0.0.0';
  const port = parseInt(process.env.PORT || '8000');

  app.listen(port, host, () => {
    console.log(`Running TurboSnek at http://${host}:${port}...`);
  });
};
