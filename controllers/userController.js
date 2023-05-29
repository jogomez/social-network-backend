const { User } = require("../models");

const userController = {
    
    /* controller to create a user */
    createUser({ body }, res) {
    User.create(body)
        .then((dbUserData) => res.json(dbUserData))
        .catch((err) => res.json(err));
    },
    
    /* controller to get all users */
    getAllUsers(req, res) {
    User.find({})
        .then((dbUserData) => res.json(dbUserData))
        .catch((err) => {
            console.log(err);
            res.sendStatus(400);
        });
    },
};

module.exports = userController;