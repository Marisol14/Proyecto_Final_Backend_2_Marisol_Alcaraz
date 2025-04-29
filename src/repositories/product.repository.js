const productDAO = require('../dao/product.dao');
const ProductDTO = require('../dtos/product.dto');

class ProductRepository {
  async getAll(filters, options) {
    const products = await productDAO.getAll(filters, options);
    return products.map(p => new ProductDTO(p));
  }

  async getById(id) {
    const p = await productDAO.getById(id);
    return p ? new ProductDTO(p) : null;
  }

  async create(data) {
    const p = await productDAO.create(data);
    return new ProductDTO(p);
  }

  async update(id, data) {
    const p = await productDAO.update(id, data);
    return new ProductDTO(p);
  }

  async delete(id) {
    return productDAO.delete(id);
  }
}

module.exports = new ProductRepository();
