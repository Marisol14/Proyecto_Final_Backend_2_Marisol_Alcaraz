class CartDTO {
    constructor({ _id, products }) {
      this.id       = _id;
      this.products = products.map(p => ({
        product:  p.product._id || p.product,
        quantity: p.quantity
      }));
    }
  }
  
  module.exports = CartDTO;
  