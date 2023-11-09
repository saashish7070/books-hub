const express = require('express');
const router = express.Router();

const user_controller = require('../controllers/userController');

router.get('/', user_controller.user_list);

router.get('/create', user_controller.user_create_get);
router.post('/create', user_controller.user_create_post);

// router.get('/:id', user_controller.user_detail);

// router.post('/addToWishlist', user_controller.wishlist);
// router.get('/wishlist',user_controller.wishlist_display)

router.get('/refreshUserBook',user_controller.refresh_user_book)

// router.get('/itemList', user_controller.item_list_display)
router.post('/itemList', user_controller.item_list)

router.post('/checkOut',user_controller.user_check_out)

module.exports = router;
