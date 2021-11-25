const express = require('express');
const CategoryController = require('../controllers/CategoryController');

const router = express.Router();
const categoryController = new CategoryController();

router.post('/create', categoryController.create);
router.get('/', categoryController.list);

module.exports = router;