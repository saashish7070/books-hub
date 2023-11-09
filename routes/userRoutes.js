const express = require('express');
const router = express.Router();

const user_controller = require('../controllers/userController');

router.get('/', user_controller.user_list);

router.get('/create', user_controller.user_create_get);
router.post('/create', user_controller.user_create_post);

router.get('/profile', user_controller.user_detail);
// router.patch('/profile', user_controller.user_detail_updated);

router.post('/addToWishlist', user_controller.wishlist);
router.get('/wishlist',user_controller.wishlist_display)


// router.get('/itemList', user_controller.item_list_display)
// router.post('/itemList', user_controller.item_list)

// router.get('/refreshUserBook',user_controller.refresh_user_book)
// router.post('/checkOut',user_controller.user_check_out)

module.exports = router;
