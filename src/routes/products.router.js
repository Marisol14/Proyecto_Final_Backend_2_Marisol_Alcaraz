const express  = require('express');
const router   = express.Router();
const ctrl     = require('../controllers/products.controller');
const authorize = require('../middlewares/authorize.middleware');

// GET /api/products
router.get('/', ctrl.getAll);
// GET /api/products/:pid
router.get('/:pid', ctrl.getById);
// PROTECTED: sólo admin
router.post('/', authorize('admin'), ctrl.create);
router.put('/:pid', authorize('admin'), ctrl.update);
router.delete('/:pid', authorize('admin'), ctrl.delete);

module.exports = router;
