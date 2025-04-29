const BaseDAO = require('./base.dao');
const Product = require('../models/product.model');

class ProductDAO extends BaseDAO {
  constructor() {
    super(Product);
  }

  // Aquí podrías añadir métodos específicos de producto si los necesitas
}

module.exports = new ProductDAO();
