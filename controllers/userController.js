const { User } = require("../models");

const userController = {
    /* controller to create a user */
    createUser({ body }, res) {
        User.create(body)
            .then((dbUserData) => res.json(dbUserData))
            .catch((err) => {
                console.log('err :>> ', err);                
                res.sendStatus(400);     
            });
    },

    /* controller to get all users */
    getAllUsers(req, res) {
        User.find({})
            .then((dbUserData) => res.json(dbUserData))
            .catch((err) => {
                console.log('err :>> ', err);
                res.json(err);
            });
    },

    /* get one user by id */
    getUserById({ params }, res) {
        // validate params.id before making the call
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

    /* update user by id */
    updateUser({ params, body }, res) {
        // validate params.id before making the call
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
                res.json({ message: `User id ${params.id} deleted` })
            }
        })
        .catch((err) => {
                console.log('err :>> ', err);
                res.json(err);
        });
    },
};

module.exports = userController;