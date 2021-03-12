const {
  create,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  getUserByEmail,
} = require("./user.service");
const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");

module.exports = {
  createUser: (req, res) => {
    const body = req.body;
    const salt = genSaltSync(10);
    body.password = hashSync(body.password, salt);
    create(body, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: "Database connection error",
        });
      }

      return res.status(200).json({
        success: 1,
        data: results,
      });
    });
  },
  getUserById: (req, res) => {
    const id = req.params.id;
    getUserById(id, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }

      if (!results) {
        return res.json({
          success: 0,
          message: "Record not found",
        });
      }

      return res.json({
        success: 1,
        data: results,
      });
    });
  },
  getUsers: (req, res) => {
    getUsers((err, results) => {
      if (err) {
        console.log(err);
        return;
      }

      return res.json({
        success: 1,
        data: results,
      });
    });
  },
  updateUser: (req, res) => {
    const body = req.body;
    const salt = genSaltSync(10);
    body.password = hashSync(body.password, salt);
    updateUser(body, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: "Database connection error",
        });
      }

      if (!results) {
        return res.json({
          success: 0,
          message: "Failed to update user",
        });
      }

      return res.status(200).json({
        success: 1,
        message: "Updated successfully",
      });
    });
  },
  deleteUser: (req, res) => {
    const body = req.body;
    deleteUser(body, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }

      // if(!results){
      //     return res.json({
      //         success: 0,
      //         message: "Record not found"
      //     });
      // }

      return res.json({
        success: 1,
        message: "User deleted successfully",
      });
    });
  },
  login: (req, res) => {
    const body = req.body;
    getUserByEmail(body.email, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }

      if (!results) {
        return res.json({
          success: 0,
          message: "Invalid email or password",
        });
      }

      const result = compareSync(body.password, results.password);
      if (results) {
        results.password = undefined;
        const jsontoken = "bearer " + sign({ result: results }, process.env.TOKEN_KEY, {
          expiresIn: "1h",
        });

        return res.json({
          success: 1,
          message: "login successful",
          token: jsontoken,
        });
      } else {
        return res.json({
          success: 0,
          message: "Invalid email or password",
        });
      }
    });
  },
};