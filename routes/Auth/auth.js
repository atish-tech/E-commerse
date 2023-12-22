const express = require('express');
const router = express.Router();

const { registerController,
    loginController,
    userDetailController,
    sellerRegisterCoontroller,
    sellerLoginController,
    updateUser,
    deleteUser,
    addFavorites,
    deleteFavorites,
} = require('../../controller/Auth/auth.controller');

const authMiddleware = require('../../middleware/middleware.auth');

router.post('/register', registerController);
router.post('/seller/register', sellerRegisterCoontroller);

router.post('/login', loginController);
router.post('/seller/login', sellerLoginController);



router.get('/me', authMiddleware, userDetailController);
router.put('/me/update', updateUser);
router.delete('/me/delete/:id', deleteUser)

router.post('/favorites/add' , authMiddleware  , addFavorites);
router.post('/favorites/remove' , authMiddleware , deleteFavorites);


module.exports = router;