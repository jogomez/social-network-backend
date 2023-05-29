const router = require("express").Router();

const {
    getAllUsers,
    createUser,
    getUserById,
} = require("../../controllers/userController");

/* 
    /api/users
*/
router.route("/")
    .post(createUser)
    .get(getAllUsers);

/* 
    /api/users/:id
*/
router.route("/:id")
    .get(getUserById);

module.exports = router;