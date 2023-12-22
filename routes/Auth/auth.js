const express = require('express');
const router = express.Router();

const { registerController,
    loginController,
    userDetailController,
    sellerRegisterCoontroller,
    sellerLoginController,
    verifyUserOtp,
    updateUser,
    deleteUser,
    addFavorites,
    deleteFavorites,
    googleAuth,
    sendOtpOnEmail,
    updatePassword
} = require('../../controller/Auth/auth.controller');

const authMiddleware = require('../../middleware/middleware.auth');

router.post('/register', registerController);
router.post('/seller/register', sellerRegisterCoontroller);
router.post('/verify', verifyUserOtp);

router.post('/login', loginController);
router.post('/seller/login', sellerLoginController);

router.post('/google/login' , googleAuth);


router.get('/me', authMiddleware, userDetailController);
router.put('/me/update', updateUser);
router.post('/forgoat' , sendOtpOnEmail);
router.put('/update/password' , updatePassword);
router.delete('/me/delete/:id', deleteUser)

router.post('/favorites/add' , authMiddleware  , addFavorites);
router.post('/favorites/remove' , authMiddleware , deleteFavorites);


module.exports = router;