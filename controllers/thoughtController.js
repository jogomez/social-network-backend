/* Require tought and user models to link them */
const { Thought, User } = require("../models");

const thoughtController = {
    /* Create a Tought */
    createThought(req, res) {
        Thought.create(req.body)
        .then(({ _id }) => {
            return User.findOneAndUpdate(
            { _id: req.body.userId },
            { $push: { thoughts: _id } },
            { new: true }
            );
        })
        .then((dbUserData) => {
            if (!dbUserData) {
            return res
                .status(404)
                .json({ message: `Thought was created but there was no user with id ${req.body.userId}` });
            }
    
            res.json({ message: "Thought was successfully created!" });
        })
        .catch((err) => res.json(err));
    },

    /* Get all Toughts */
    getAllThoughts(req, res) {
        Thought.find({})
        .select("-__v")
        .then((dbThoughtData) => res.json(dbThoughtData))
        .catch((err) => {
            console.log(err);
            res.sendStatus(400);
        });
    },

    getOneThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
        .select("-__v")
        .then((thought) =>
            !thought
            ? res.
                status(404).
                json({ message:`No thought found with id: ${req.params.thoughtId}` })
            : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
    },

    updateThought(req, res) {
        Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, New: true }
        )
        .then((user) =>
            !user
            ? res.status(404).json({ message: `No thought found with id: ${req.params.thoughtId}` })
            : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
    },
    
    deleteThought(req, res) {
        Thought.findOneAndDelete({ _id: req.params.thoughtId })
        .then((thought) =>
            !thought
            ? res.status(404).json({ message: "No thought found with this ID!" })
            : User.findOneAndUpdate(
                { thoughts: req.params.thoughtId },
                { $pull: { thoughts: req.params.thoughtId } },
                { new: true }
                )
        )
        .then((user) =>
            !user
            ? res.status(404).json({ message: 'Thought deleted, but no user found'})
            : res.json({ message: 'Thought successfully deleted' })
        )
        .catch((err) => res.status(500).json(err));
    },
    
    /* add reaction */
    createReaction({ params, body }, res) {
    Thought.findOneAndUpdate(
        { _id: params.thoughtId },
        { $addToSet: { reactions: body } },
        { new: true, runValidators: true }
    )
        .then((dbThoughtData) => {
        if (!dbThoughtData) {
            res.status(404).json({ message: "No thought found with this id" });
            return;
        }
        res.json(dbThoughtData);
        })
        .catch((err) => res.json(err));
    },

    /* delete reaction */
    deleteReaction({ params }, res) {        
    Thought.findOneAndUpdate(
        { _id: params.thoughtId },
        { $pull: { reactions: { reactionId: params.reactionId } } },
        { new: true }
    )
        .then((dbThoughtData) => res.json(dbThoughtData))
        .catch((err) => res.json(err));
    },
};

module.exports = thoughtController;