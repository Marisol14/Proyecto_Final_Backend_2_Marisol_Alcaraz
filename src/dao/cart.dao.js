const BaseDAO = require('./base.dao');
const Cart = require('../models/cart.model');

class CartDAO extends BaseDAO {
  constructor() {
    super(Cart);
  }
}

module.exports = new CartDAO();
