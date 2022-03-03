import { Command } from 'commander';
import { serve } from 'local-api';
import path from 'path';

export const serveCommand = new Command()
    .command('serve [filename]')
    .description('Open a file for editing')
    .option('-p, --port <number>', 'port to run server on', '4050')
    .action((filename = 'nodebook.js', options: { port: string }) => {
        console.log(path.join(process.cwd(), path.dirname(filename)));
        console.log(path.basename(filename));
        const dir = path.join(process.cwd(), path.dirname(filename));
        serve(parseInt(options.port), path.basename(filename), dir);
    });
