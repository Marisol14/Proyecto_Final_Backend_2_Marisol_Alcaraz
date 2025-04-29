// src/controllers/users.controller.js

const User    = require('../models/user.model');
const UserDTO = require('../dtos/user.dto');

/**
 * POST /api/users/register
 * Registra un nuevo usuario, hashea la contraseña en el pre('save')
 */
exports.register = async (req, res, next) => {
  try {
    const { first_name, last_name, email, age, password } = req.body;

    // 1) Verificar si ya existe el email
    const exists = await User.findOne({ email });
    if (exists) {
      return res
        .status(400)
        .json({ status: 'error', message: 'El email ya está registrado' });
    }

    // 2) Crear y guardar el usuario (bcrypt en pre('save'))
    const user = new User({ first_name, last_name, email, age, password });
    await user.save();

    // 3) Devolver respuesta
    return res
      .status(201)
      .json({
        status: 'success',
        payload: { id: user._id, email: user.email }
      });
  } catch (err) {
    next(err);
  }
};

/**
 * GET /api/users/current
 * Devuelve el usuario autenticado, usando DTO para ocultar datos sensibles
 * req.user lo inyecta Passport-JWT en el middleware de ruta
 */
exports.current = (req, res) => {
  // Mapeamos solo los campos seguros
  const dto = new UserDTO(req.user);
  res.json({ status: 'success', data: dto });
};
