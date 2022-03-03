import { Command } from 'commander';
import { serve } from 'local-api';
import path from 'path';

// only when the cli is published, it'll be true.
// for whether we are in development mode and should use proxy
const isProduction = process.env.NODE_ENV === 'production';

// use Commander.js to handle the arguments and options
export const serveCommand = new Command()
    .command('serve [filename]')
    .description('Open a file for editing')
    .option('-p, --port <number>', 'port to run server on', '4050')
    .action(async (filename = 'nodebook.js', options: { port: string }) => {
        try {
            // pass to serve funtion exposed by local-api
            const dir = path.join(process.cwd(), path.dirname(filename));
            await serve(parseInt(options.port), path.basename(filename), dir, !isProduction);
            console.log(`Opened ${filename}. Navigate to http://localhost:${options.port} to edit the file`);
        } catch (err) {
            if (err.code === 'EADDRINUSE') {
                console.log('Port is in use, please try running on a different port');
            } else {
                console.log('Problem is:', err.message);
            }

            process.exit(1);
        }
    });
