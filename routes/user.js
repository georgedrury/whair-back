const express = require('express')
const {
    userById, 
    allUsers, 
    getUser, 
    updateUser, 
    deleteUser,
    userPhoto,
    hasAuthorization
} = require('../controllers/user.js')
const {requireSignin} = require('../controllers/auth.js')

const router = express.Router()

router.get("/users", allUsers);
router.get("/user/:userId", getUser);
// remove auth
router.put("/user/:userId", requireSignin, hasAuthorization, updateUser);
router.delete("/user/:userId", requireSignin, hasAuthorization, deleteUser);

//photo
router.get('/user/photo/:userId', userPhoto)

// any routes containing userId our app will first execute userById()
router.param("userId", userById)

module.exports = router








