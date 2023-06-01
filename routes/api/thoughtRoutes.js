const router = require("express").Router();

const {
    createThought,
    getAllThoughts,    
} = require("../../controllers/thoughtController");

/*
    /api/thoughts
*/
router.route("/")
    .post(createThought)
    .get(getAllThoughts);

module.exports = router;