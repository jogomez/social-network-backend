const router = require("express").Router();

const {
    getAllUsers,
    createUser,
    getUserById,
    updateUser,
    deleteUser,
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
    .get(getUserById)
    .post(updateUser)
    .delete(deleteUser);
module.exports = router;