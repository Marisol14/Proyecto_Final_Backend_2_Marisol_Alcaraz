const cartDAO = require('../dao/cart.dao');
const CartDTO = require('../dtos/cart.dto');

class CartRepository {
  async getById(id) {
    const c = await cartDAO.model.findById(id).populate('products.product');
    return c ? new CartDTO(c) : null;
  }

  async create() {
    const c = await cartDAO.create({ products: [] });
    return new CartDTO(c);
  }

  async addProduct(cartId, productId, qty = 1) {
    const cart = await cartDAO.model.findById(cartId);
    const idx  = cart.products.findIndex(p => p.product.equals(productId));
    if (idx >= 0) {
      cart.products[idx].quantity += qty;
    } else {
      cart.products.push({ product: productId, quantity: qty });
    }
    await cart.save();
    return new CartDTO(await cart.populate('products.product'));
  }

  async removeProduct(cartId, productId) {
    const cart = await cartDAO.model.findById(cartId);
    cart.products = cart.products.filter(p => !p.product.equals(productId));
    await cart.save();
    return new CartDTO(await cart.populate('products.product'));
  }

  async clearCart(cartId) {
    const cart = await cartDAO.model.findById(cartId);
    cart.products = [];
    await cart.save();
    return new CartDTO(cart);
  }
}

module.exports = new CartRepository();
