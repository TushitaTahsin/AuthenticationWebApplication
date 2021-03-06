const {
  createUser,
  getUserById,
  getUsers,
  updateUser,
  deleteUser,
  login,
} = require("./user.controller");
const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");

router.post("/", createUser);
router.get("/", checkToken, getUsers);
router.get("/:id", checkToken, getUserById);
router.put("/", checkToken, updateUser);
router.delete("/", checkToken, deleteUser);
router.post("/login", login);

module.exports = router;
