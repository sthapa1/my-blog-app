const express = require('express');
const PostController = require('../controllers/PostController');
const { verifyToken } = require('../middlewares/auth');

const router = express.Router();
const postController = new PostController();

router.post('/create', verifyToken, postController.create);
router.patch('/:id', verifyToken, postController.update);
router.get('/', postController.list);
router.get('/latest', postController.latest);
router.get('/:id', postController.view);
router.delete('/:id', verifyToken, postController.delete);

module.exports = router;