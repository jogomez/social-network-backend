const router = require("express").Router();

/*
    A router object is an isolated instance of middleware and routes. 
    You can think of it as a “mini-application,” capable only of performing middleware and routing functions. 
    Every Express application has a built-in app router.

    A router behaves like middleware itself, so you can use it as an argument to app.use() or as the argument to another router’s use() method.
    The top-level express object has a Router() method that creates a new router object.
    Once you’ve created a router object, 
    you can add middleware and HTTP method routes (such as get, put, post, and so on) to it just like an application.

    Source: http://expressjs.com/en/5x/api.html#router
*/

const apiRoutes = require("./api");
router.use("/api", apiRoutes);

router.use((req, res) => {
    res.status(404).send("<h1>~~ Ooops! 404 Error ~~</h1>");
});

module.exports = router;