const jwt = require('jsonwebtoken');
const { User } = require('../models');
require('dotenv').config();

class AuthController {
  async register(req, res) {
    try {
      const { name, email, password } = req.body;

      const userExists = await User.findOne({ where: { email } });
      if (userExists) {
        return res.status(400).json({ error: 'Usuário já existe' });
      }

      const user = await User.create({ name, email, password });

      // Não retornar a senha no response
      user.password = undefined;
      user.password_hash = undefined;

      return res.status(201).json({
        user,
        token: generateToken({ id: user.id }),
      });
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao registrar usuário' });
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ where: { email } });

      if (!user) {
        return res.status(401).json({ error: 'Usuário não encontrado' });
      }

      if (!user.checkPassword(password)) {
        return res.status(401).json({ error: 'Senha incorreta' });
      }

      // Não retornar a senha no response
      user.password = undefined;
      user.password_hash = undefined;

      return res.json({
        user,
        token: generateToken({ id: user.id }),
      });
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao fazer login' });
    }
  }
}

function generateToken(params = {}) {
  return jwt.sign(params, process.env.JWT_SECRET || 'seu_jwt_secret_seguro', {
    expiresIn: '1d',
  });
}

module.exports = new AuthController();