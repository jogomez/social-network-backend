const { User, Thought } = require("../models");

const userController = {
    /* controller to create a user */
    createUser({ body }, res) {
        /* Verify if the username or email is already registered */
        User.find({ username: body.username, email: body.email })
        .then((dbUserData) => {
            if (dbUserData.username === body.username || dbUserData.email === body.email) {
                return res.status(404)
                .json({ message: `Username and/or email already exist in database` });
            }
            else{
                /* create the user */
                User.create(body)
                    .then((dbUserData) => res.json(dbUserData))
                    .catch((err) => {
                        console.log('err :>> ', err);                
                        res.sendStatus(400);     
                    });
            }
        });
    },

    /* controller to get all users */
    getAllUsers(req, res) {
        User.find({})
            .select("-__v")
            .then((dbUserData) => res.json(dbUserData))
            .catch((err) => {
                console.log('err :>> ', err);
                res.json(err);
            });
    },

    /* controller to get one user by id */
    getUserById({ params }, res) {
        // validate user id before making the call
        if (params.id.length !== 24){
            res.status(404)
            .json({ message: `User id's lenght is not 24 characters`});
            return ;
        }

        User.findOne({ _id: params.id })
        .then((dbUserData) => {
            if (!dbUserData) {
                res.status(404)
                .json({ message: `User id ${params.id} not found` });
                return;
            }
            res.json(dbUserData);
        })
        .catch((err) => {
            console.log('err :>> ', err);
            res.json(err);
        });
    },

    /* controller to update user by id */
    updateUser({ params, body }, res) {
        // validate user id before making the call
        if (params.id.length !== 24){
            res.status(404)
            .json({ message: `User id's lenght is not 24 characters`});
            return;
        }

        User.findOneAndUpdate({ _id: params.id }, body, {
        new: true,
        runValidators: true,
        })
        .then((dbUserData) => {
            if (!dbUserData) {
                res.status(404)
                .json({ message: `User id ${params.id} not found` });
                return;
            }
            res.json(dbUserData);
        })
        .catch((err) => {
            console.log('err :>> ', err);
            res.json(err);
        });
    },


    /* delete user by id */
    deleteUser({ params }, res) {
        // validate params.id before making the call
        if (params.id.length !== 24){
            res.status(404)
            .json({ message: `User id's lenght is not 24 characters`});
            return;
        }

        User.findOneAndDelete({ _id: params.id })
        .then((dbUserData) => {
            if (dbUserData === null) {
                res.status(404).
                json({ message: `User id ${params.id} not found` });
                return;
            }
            else
            {
                Thought.deleteMany({ _id: { $in: dbUserData.thoughts } });
                res.json({ message: `User id ${params.id} deleted` });
                return;
            }
        })
        .catch((err) => {
                console.log('err :>> ', err);
                res.json(err);
        });
    },

    /* add a friend */
    addFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.userId }, // filter by Id 
            { $addToSet: { friends: params.friendId } }, //update the '$addToSet' operator adds a value to an array unless it already exists.
            { new: true, runValidators: true } //new = true -> returns the document after update was applied.
        )
        .then((dbUserData) => {
            if (!dbUserData) {
                res.status(404).json({ message: `User id ${params.id} not found` });
                return;
            }
            res.json(dbUserData);
        })
        .catch((err) => res.json(err));
    },

    /* delete friend */ 
    removeFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.userId },
            { $pull: { friends: params.friendId } },
            { new: true }
        )
        .then((dbUserData) => {
            if (!dbUserData) {
                res.status(404)
                .json({ message: `User id ${params.id} not found` });
                return;
            }
            res.json(dbUserData);
        })
        .catch((err) => res.json(err));
    },
};

module.exports = userController;