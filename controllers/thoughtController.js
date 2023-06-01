/* Require tought and user models to link them */
const { Thought, User } = require("../models");

const thoughtController = {
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
                .json({ message: "Thought was created but there was no user with this id!" });
            }
    
            res.json({ message: "Thought was successfully created!" });
        })
        .catch((err) => res.json(err));
    },
    // get all Thoughts
    getAllThoughts(req, res) {
        Thought.find({})
        .then((dbThoughtData) => res.json(dbThoughtData))
        .catch((err) => {
            console.log(err);
            res.sendStatus(400);
        });
    },
};

module.exports = thoughtController;