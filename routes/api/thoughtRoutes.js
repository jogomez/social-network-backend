const router = require("express").Router();

const {
    createThought,
    getAllThoughts, 
    getOneThought,
    updateThought,
    deleteThought,
    createReaction,
    deleteReaction,   
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

/*
    /api/thoughts/:thoughtId/reactions
*/
router.route("/:thoughtId/reactions")
    .post(createReaction);

/* 
    /api/thoughts/:thoughtId/reactions/:reactionId
*/
router.route("/:thoughtId/reactions/:reactionId")
    .delete(deleteReaction);

module.exports = router;