const cartRepo   = require('../repositories/cart.repository');
const ticketRepo = require('../repositories/ticket.repository');
const { sendPurchaseConfirmation } = require('../services/mail.service');

exports.getById = async (req, res, next) => {
  try {
    const cart = await cartRepo.getById(req.params.cid);
    if (!cart) return res.status(404).json({ status: 'error', message: 'Carrito no encontrado' });
    res.json({ status: 'success', data: cart });
  } catch (err) { next(err); }
};

exports.createCart = async (req, res, next) => {
  try {
    const cart = await cartRepo.create();
    res.status(201).json({ status: 'success', data: cart });
  } catch (err) { next(err); }
};

exports.addProduct = async (req, res, next) => {
  try {
    const { cid, pid } = req.params;
    const qty = req.body.quantity || 1;
    const cart = await cartRepo.addProduct(cid, pid, qty);
    res.json({ status: 'success', data: cart });
  } catch (err) { next(err); }
};

exports.removeProduct = async (req, res, next) => {
  try {
    const { cid, pid } = req.params;
    const cart = await cartRepo.removeProduct(cid, pid);
    res.json({ status: 'success', data: cart });
  } catch (err) { next(err); }
};

exports.purchase = async (req, res, next) => {
  try {
    const cid = req.params.cid;
    const cart = await cartRepo.getById(cid);
    if (!cart) return res.status(404).json({ status: 'error', message: 'Carrito no encontrado' });

    let total = 0;
    const failed = [];
    // check stock
    for (const item of cart.products) {
      const prod = await require('../dao/product.dao').model.findById(item.product);
      if (prod.stock >= item.quantity) {
        prod.stock -= item.quantity;
        await prod.save();
        total += prod.price * item.quantity;
      } else {
        failed.push(item.product);
      }
    }

    // generar ticket sólo con lo comprador
    const ticket = await ticketRepo.create({
      amount: total,
      purchaser: req.user.email
    });

    // enviar email
    await sendPurchaseConfirmation(req.user.email, ticket);

    // actualizar carrito con sólo los no comprados
    const newCart = await cartRepo.clearCart(cid);
    for (const pid of failed) {
      await cartRepo.addProduct(cid, pid, 1);
    }

    res.json({
      status: 'success',
      ticket,
      failedProducts: failed
    });
  } catch (err) { next(err); }
};
