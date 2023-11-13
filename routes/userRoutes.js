const express = require('express');
const router = express.Router();

const user_controller = require('../controllers/userController');

router.get('/', user_controller.user_list);
router.get('/:id', user_controller.user_detail);

router.get('/create', user_controller.user_create_get);
router.post('/create', user_controller.user_create_post);

router.post('/profile/:id', user_controller.user_profile);
router.get('/profile/:id', user_controller.user_profile_detail);
// router.patch('/profile', user_controller.user_detail_updated);


router.post('/addToWishlist', user_controller.wishlist);
router.get('/wishlist/:id',user_controller.wishlist_display)
router.delete('/wishlist/:id',user_controller.wishlist_remove)

router.post('/itemList', user_controller.item_list)
router.get('/itemList/:id', user_controller.item_list_display)
router.delete('/itemList/:id', user_controller.item_list_remove)

// router.get('/refreshUserBook',user_controller.refresh_user_book)
// router.post('/checkOut',user_controller.user_check_out)

module.exports = router;
