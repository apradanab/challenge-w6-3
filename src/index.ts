import { createServer } from 'http';
import createDebug from 'debug';
import 'dotenv/config';
import { app } from './app.js';

const debug = createDebug('W6E:server');

const port = process.env.PORT ?? 3000;
// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
const server = createServer(app);
server.listen(port);

server.on('error', (error) => {
  debug('Error:', error);
  process.exit(1);
});

server.on('listening', () => {
  debug(`Server Express is running http://localhost:${port}`);
});
