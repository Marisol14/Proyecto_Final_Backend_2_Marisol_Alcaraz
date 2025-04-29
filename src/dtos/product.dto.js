class ProductDTO {
    constructor({ _id, title, description, price, stock, code, thumbnail }) {
      this.id          = _id;
      this.title       = title;
      this.description = description;
      this.price       = price;
      this.stock       = stock;
      this.code        = code;
      this.thumbnail   = thumbnail;
    }
  }
  
  module.exports = ProductDTO;
  