# CV-Info

A basic Node.js REST application to protect information on a static site.

This application is intended for use with a static site using a framework
such as Gatsby.js. The `user` endpoint checks the credentials and returns
a JWT. A valid JWT is required to access the `cv-info` endpoint.

## API

| Endpoint        | HTTP verb | Notes                                                                                                                                 |
|-----------------|-----------|---------------------------------------------------------------------------------------------------------------------------------------|
| /api/auth       | POST      | Validate credentials.  Data: {username, password}.  Return: 200 with JWT, or 403 error.   |
| /api/cvinfo/:id | GET       | Retrieve resource by id. JWT passed in `Authorization` header.  Return: 200 with {details}, 403 if JWT missing/invalid, or 400 error.                               |

## Implementation

This implementation is intentially simple. No Express or other frameworks. There is a basic `server.js` to route the requests. All HTTP details are managed here. The resource handlers (`user.js` and `cvinfo.js`) are not HTTP aware. This is so they could be called from  API Gateway as an AWS Lambda, or similar. There's no database, although it could easily be added.

The `auth` POST method checks agains a single username / password combination stored as an environment variable. It could easily be changed to database lookup.

The `cvinfo` GET method looks up a resource from a file. This could be replaced by database lookup or some other resource.

