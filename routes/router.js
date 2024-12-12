const express = require('express')
const userController = require('../controllers/userController')
const projectController = require('../controllers/projectController')
const jwtMiddleware = require('../middlewares/jwtMiddleware')
const multerMiddleware = require('../middlewares/multerMiddleware')
const multer = require('multer')

const router = new express.Router()

//register
router.post('/register',userController.registerController)
//login -post
router.post('/login',userController.loginController)
//add-project - post
router.post('/add-project',jwtMiddleware,multerMiddleware.single('projectImage'),projectController.addProjectController)

//home project -get
router.get('/home-projects',projectController.getHomeProjectscontroller)
//user-project - get
router.get('/user-projects',jwtMiddleware,projectController.getUserProjectscontroller)
//all-project - get 
router.get('/all-projects',jwtMiddleware,projectController.getAllProjectscontroller)

//edit-project
router.put('/projects/:id/edit',jwtMiddleware,multerMiddleware.single('projectImage'),projectController.editProjectController)

//remove-project
router.delete('/projects/:id/remove',jwtMiddleware,projectController.removeProjectController)

//edit user -put 
router.put('/user/edit',jwtMiddleware,multerMiddleware.single("profilePic"),userController.editUserController)

module.exports = router
