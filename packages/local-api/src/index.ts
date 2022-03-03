import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { createCellsRouter } from './routes/cells';
import path from 'path';

// serve up React app (local-client) and save & load the cells in given file
export const serve = (port: number, filename: string, dir: string, useProxy: boolean) => {
    const app = express();

    if (useProxy) {
        app.use(
            createProxyMiddleware({
                target: 'http://localhost:3000',
                ws: true,
                logLevel: 'silent',
            })
        );
    } else {
        // use to get the absolute path, rather than sybolic link
        const packagePath = require.resolve('local-client/build/index.html');

        // exclude the 'index.html' in the end of the path
        app.use(express.static(path.dirname(packagePath)));
    }

    // Wire up the express router
    app.use(createCellsRouter(filename, dir));

    return new Promise<void>((resovle, reject) => {
        app.listen(port, resovle).on('error', reject);
    });
};
