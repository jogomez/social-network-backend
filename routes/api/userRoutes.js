const router = require("express").Router();

const {
    getAllUsers,
    createUser,
  } = require("../../controllers/userController");

/* 
    /api/users
*/
router.route("/").post(createUser);
router.route("/").get(getAllUsers);

module.exports = router;