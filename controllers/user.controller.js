const User = require("../models/user.model");

module.exports = class UserController {
   async getUsers(req, res, next) {
      try {
         const result = await User.findAll();
         res.createResponse(true, result, "Save successfully.", 200);
      }
      catch (err) {
         res.createResponse(false, err, "Error Occurred.", 500);
      }
   }
   async addUser(req, res, next) {
      try {
         const result = await User.findAll();
         res.sendResponse(true, result, "Save successfully.", 200);
      }
      catch (err) {
         res.sendResponse(false, err, "Error Occurred.", 500);
      } 
   }
}