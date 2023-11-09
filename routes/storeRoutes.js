const express = require('express');
const router = express.Router();

const store_controller = require('../controllers/storeController');

router.get('/', store_controller.store_list);

// router.get('/addNew', store_controller.store_create_get);
// router.post('/addNew', store_controller.store_create_post);

// router.get('/:id/update', store_controller.store_update_get);
// router.post('/:id/update', store_controller.store_update_post);

// router.get('/:id/delete', store_controller.store_delete_get);
// router.delete('/:id/delete', store_controller.store_delete);

// router.get('/storeDetail/:id', store_controller.store_detail);

// router.post('/storeBooks/:id', store_controller.store_books_post);

// router.get('/storeBooks/:id', store_controller.store_books_get);

module.exports = router;
