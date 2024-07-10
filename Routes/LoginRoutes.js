const express = require("express");
const router = express.Router();
const userController = require("../Controller/UserController");
const requiresAuth = require("../helper");

router.post("/login", userController.login);

router.post('/Create', userController.User_create);
router.get('/Userlist',userController.getUser_details);
router.post('/User_update', userController.User_update);
router.delete('/deleteUser',userController.deleteUser);
router.get("/getOneUser",userController.getOneUser);









module.exports = router;