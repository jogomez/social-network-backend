const router = require("express").Router();

const {
    getAllUsers,
    createUser,
    getUserById,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend,
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

/* 
    /api/users/:userId/friends/:friendId
*/
router.route("/:userId/friends/:friendId")
    .post(addFriend)
    .delete(removeFriend);

module.exports = router;