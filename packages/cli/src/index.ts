import { program } from 'commander';
import { serveCommand } from './commands/serve';
import path from 'path';

program.addCommand(serveCommand);

program.parse(process.argv);
