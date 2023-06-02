const router = require("express").Router();

const {
    createThought,
    getAllThoughts, 
    getOneThought,
    updateThought,
    deleteThought,   
} = require("../../controllers/thoughtController");

/*
    /api/thoughts
*/
router.route("/")
    .post(createThought)
    .get(getAllThoughts);

/* 
    /api/thoughts/:thoughtId
*/
router.route('/:thoughtId')
.get(getOneThought)
.put(updateThought)
.delete(deleteThought);

module.exports = router;