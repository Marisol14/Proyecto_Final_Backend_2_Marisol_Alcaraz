const productRepo = require('../repositories/product.repository');

exports.getAll = async (req, res, next) => {
  try {
    const products = await productRepo.getAll();
    res.json({ status: 'success', data: products });
  } catch (err) { next(err); }
};

exports.getById = async (req, res, next) => {
  try {
    const p = await productRepo.getById(req.params.pid);
    if (!p) return res.status(404).json({ status: 'error', message: 'Producto no encontrado' });
    res.json({ status: 'success', data: p });
  } catch (err) { next(err); }
};

exports.create = async (req, res, next) => {
  try {
    const p = await productRepo.create(req.body);
    res.status(201).json({ status: 'success', data: p });
  } catch (err) { next(err); }
};

exports.update = async (req, res, next) => {
  try {
    const p = await productRepo.update(req.params.pid, req.body);
    res.json({ status: 'success', data: p });
  } catch (err) { next(err); }
};

exports.delete = async (req, res, next) => {
  try {
    await productRepo.delete(req.params.pid);
    res.json({ status: 'success', message: 'Producto eliminado' });
  } catch (err) { next(err); }
};
