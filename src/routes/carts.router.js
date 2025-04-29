const express  = require('express');
const router   = express.Router();
const ctrl     = require('../controllers/carts.controller');
const authorize = require('../middlewares/authorize.middleware');
const passport = require('passport');

// GET /api/carts/:cid
router.get('/:cid', passport.authenticate('jwt', { session: false }), ctrl.getById);
// POST /api/carts
router.post('/', ctrl.createCart);
// POST /api/carts/:cid/product/:pid   —— sólo user
router.post('/:cid/product/:pid', authorize('user'), ctrl.addProduct);
// DELETE /api/carts/:cid/product/:pid  —— sólo user
router.delete('/:cid/product/:pid', authorize('user'), ctrl.removeProduct);
// POST /api/carts/:cid/purchase        —— sólo user
router.post('/:cid/purchase', authorize('user'), ctrl.purchase);

module.exports = router;
