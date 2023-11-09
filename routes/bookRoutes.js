const express = require('express');
const router = express.Router();

const book_controller = require('../controllers/bookController');

router.get('/', book_controller.book_list);

// router.get('/create', book_controller.book_create_get);
router.post('/create', book_controller.book_create_post);

router.get('/:id/update', book_controller.book_update_get);
router.post('/:id/update', book_controller.book_update_post);

router.get('/:id/delete', book_controller.book_delete_get);
router.delete('/:id/delete', book_controller.book_delete);

router.get('/:id', book_controller.book_detail);

module.exports = router;
