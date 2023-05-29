const express = require('express');
const db = require('./config/connection');
const routes = require('./routes');
const PORT = process.env.PORT || 3001;

/*
    Creates an Express application. The express() function is a top-level function exported by the express module.
    The app object has methods for:
        - Routing HTTP requests; e.g. app.METHOD and app.param.
        - Configuring middleware; (app.route).
        - Rendering HTML views; (app.render).
        - Registering a template engine; (app.engine).
    Source: https://expressjs.com/en/4x/api.html#app

    The app returned by express() is in fact a JavaScript Function, 
    designed to be passed to Node’s HTTP servers as a callback to handle requests. 
    This makes it easy to provide both HTTP and HTTPS versions of your app with the same code base, 
    as the app does not inherit from these (it is simply a callback).
    Source: https://expressjs.com/en/5x/api.html#app.listen_path_callback

*/
const app = express();

/* 
    .urlencoded allows to choose between parsing the URL-encoded data with the querystring library (when false),
    or the qs library (when true). 
    The “extended” syntax allows for rich objects and arrays to be encoded into the URL-encoded format, 
    allowing for a JSON-like experience with URL-encoded.
    Source: https://expressjs.com/en/4x/api.html#express.urlencoded
*/
app.use(express.urlencoded({ extended: true }));

/*
    .json is a built-in middleware function in Express. It parses incoming requests with JSON payloads and is based on body-parser.
    Returns middleware that only parses JSON and only looks at requests where the Content-Type header matches the type option.
    This parser accepts any Unicode encoding of the body and supports automatic inflation of gzip and deflate encodings.
    A new body object containing the parsed data is populated on the request object after the middleware (i.e. req.body), 
    or an empty object ({}) if there was no body to parse, the Content-Type was not matched, or an error occurred.
    Source: https://expressjs.com/en/api.html#express.json
*/
app.use(express.json());

/*
    We are using a custom middleware, which is a Router-level middleware 
    Router-level middleware works in the same way as application-level middleware, except it is bound to an instance of express.Router().
    The application-level middleware is bound to the app object by using the app.use() and app.METHOD() functions, 
    where METHOD is the HTTP method of the request that the middleware function handles (such as GET, PUT, or POST) in lowercase.
    Source: https://expressjs.com/en/guide/using-middleware.html#middleware.router
*/
app.use(routes);

/*
    When the database is connected, the express app will start listening for connections.
    app.listen binds and listens for connections on the specified host and port. 
    This method is identical to Node’s http.Server.listen().
    If port is omitted or is 0, the operating system will assign an arbitrary unused port, 
    which is useful for cases like automated tasks (tests, etc.).
    Source: https://expressjs.com/en/5x/api.html#app.listen
*/

db.once('open', () => {
    app.listen(PORT, () => {
        console.log(`API Express server is now running on port ${PORT}`);
    });
});
