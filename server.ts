import {
  getApiKeyFromFile,
  removeApiKeyFromFile,
  saveApiKeyToFile,
} from './utilities/server/apiKeys';
import { matchPath } from './utilities/server/routing';

import {
  createServer,
  IncomingMessage,
} from 'http';

import { parse } from 'url';
import next from 'next';
import { getProjectIdFromQuery } from './utilities/utils';

const port = process.env.PORT || 3000;


const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const readRequestBody = (request: IncomingMessage): Promise<string> => {
  return new Promise((resolve, reject) => {
    let body = '';
    request.on('data', function (data) {
      body += data;
      // 1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB
      if (body.length > 1e6) {
        // FLOOD ATTACK OR FAULTY CLIENT, NUKE REQUEST
        request.connection.destroy();
        reject(new Error('Flood attack'));
      }
    });
    request.on('end', function () {
      resolve(body);
    });
  });
};

app.prepare()
  .then(() => {
    createServer(async (req, res) => {
      // Be sure to pass `true` as the second argument to `url.parse`.
      // This tells it to parse the query portion of the URL.
      const parsedUrl = parse(req.url || '', true);
      const { pathname, query } = parsedUrl;

      const apiKeyMatch = matchPath<{ readonly projectId: string }>(pathname || '', '/api-key/:projectId');
      if (apiKeyMatch) {
        const { projectId } = apiKeyMatch;
        if (req.method === 'GET') {
          console.log(`Someone wanted an API Key pro project with id '${projectId}'?`);
          res.write(JSON.stringify({
            key: await getApiKeyFromFile(projectId),
          }, null, 2), 'utf8', (error: any) => {
            if (error) {
              console.error(error);
            }
            res.end();
          });
        }
        else if (req.method === 'PUT') {
          console.log(`Someone is giving me an API key for project id '${projectId}'. Om nom nom...`);
          try {
            const requestBody = await readRequestBody(req);
            const apiKey = JSON.parse(requestBody).key;
            await saveApiKeyToFile(projectId, apiKey);
            res.end();
          }
          catch (e) {
            res.statusCode = 400;
            res.write(JSON.stringify(e), 'utf8', () => {
              res.end();
            });
          }
        }
        else if (req.method === 'DELETE') {
          console.log(`They want me to forget API key for project id '${projectId}'. What APi key?`);
          try {
            await removeApiKeyFromFile(projectId);
            res.end();
          }
          catch (e) {
            res.statusCode = 400;
            res.write(JSON.stringify(e), 'utf8', () => {
              res.end();
            });
          }
        }
        else {
          res.statusCode = 501;
          res.end();
        }
      }
      else {
        const projectId = getProjectIdFromQuery(query);
        if (Object.keys(query).includes('preview') && !(await getApiKeyFromFile(projectId))) {
          app.render(req, res, '/api-key-form', query);
        }
        else {
          try {
            await handle(req, res, parsedUrl);
          }
          catch (e) {
            app.renderError(e, req, res, pathname || '', query);
          }
        }
      }
    })
      .listen(port, (err: Error) => {
        if (err) {
          throw err;
        }
        console.log(`> Ready on http://localhost:${port}`);
      });
  });
