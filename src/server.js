const dotenv = require('dotenv').config();
const http = require('http');
const jsonBody = require('body/json');
const url = require('url');
const util = require('util');

const AuthError = require('./errors/AuthError');
const NotFoundError = require('./errors/NotFoundError');

const authHandler = require('./handlers/authHandler');
const cvinfoHandler = require('./handlers/cvinfoHandler');
const loginHandler = require('./handlers/loginHandler');

// check dotenv setup
if (dotenv.error) {
  throw dotenv.error;
}
const server = http.createServer(async (req, res) => {
  const parsedUrl = url.parse(req.url, true);

  // Handle POST /api/user
  if (parsedUrl.pathname === '/api/login' && req.method === 'POST') {
    const jsonBodyPromise = util.promisify(jsonBody);
    jsonBodyPromise(req).then(({ username, password }) => {
      if (!username || !password) {
        res.statusCode = 400;
        res.end(
          JSON.stringify({
            error: 'Both username and password parameters are required.',
          })
        );
      } else {
        loginHandler(username, password).then((jwt) => {
          if (jwt) {
            res.statusCode = 200;
            res.end(
              JSON.stringify({ message: "Here's your new token.", token: jwt })
            );
          } else {
            res.statusCode = 403;
            res.end(JSON.stringify({ error: 'Not authorized.' }));
          }
        });
      }
    });
  }

  //handle GET /api/cvinfo/{id}
  else if (
    parsedUrl.pathname.startsWith('/api/cvinfo') &&
    req.method === 'GET'
  ) {
    const parsedPath = parsedUrl.pathname.match(/\/api\/cvinfo\/(\w+)/);
    const id = parsedPath[1];

    if (!id) {
      res.statusCode = 400;
      res.end(JSON.stringify({ error: 'Invalid ID.' }));
    } else {
      authHandler(req.headers.authorization)
        .then((username) => {
          return cvinfoHandler(id);
        })
        .then((data) => {
          res.statusCode = 200;
          res.end(JSON.stringify({ data: data }));
        })
        .catch((err) => {
          console.log(err.constructor.name);
          if (err instanceof AuthError) {
            res.statusCode = 403;
            res.end(JSON.stringify({ error: err.message }));
          } else if (err instanceof NotFoundError) {
            res.statusCode = 404;
            res.end(JSON.stringify({ error: err.message }));
          }
        });
    }
  } else {
    res.statusCode = 404;
    res.end('Endpoint not found.');
  }
});

server.listen(process.env.SERVER_PORT);
