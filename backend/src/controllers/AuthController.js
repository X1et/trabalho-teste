const jwt = require('jsonwebtoken');
const { User } = require('../models');
require('dotenv').config();

class AuthController {
  async register(req, res) {
    try {
      const { name, email, password } = req.body;
      
      console.log('Tentando registrar usuário:', { name, email });

      const userExists = await User.findOne({ where: { email } });
      if (userExists) {
        return res.status(400).json({ error: 'Usuário já existe' });
      }

      const user = await User.create({ name, email, password });
      console.log('Usuário criado com sucesso:', user.id);

      // Não retornar a senha no response
      const userData = user.toJSON();
      delete userData.password;
      delete userData.password_hash;

      const token = generateToken({ id: user.id });
      console.log('Token gerado com sucesso');

      return res.status(201).json({
        user: userData,
        token,
      });
    } catch (error) {
      console.error('Erro ao registrar usuário:', error);
      return res.status(500).json({ error: 'Erro ao registrar usuário' });
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;
      console.log('Tentando login com:', email);

      const user = await User.findOne({ where: { email } });

      if (!user) {
        console.log('Usuário não encontrado:', email);
        return res.status(401).json({ error: 'Usuário não encontrado' });
      }

      if (!user.checkPassword(password)) {
        console.log('Senha incorreta para usuário:', email);
        return res.status(401).json({ error: 'Senha incorreta' });
      }

      console.log('Login bem-sucedido para:', email);
      
      // Não retornar a senha no response
      const userData = user.toJSON();
      delete userData.password;
      delete userData.password_hash;

      const token = generateToken({ id: user.id });
      console.log('Token gerado com sucesso para usuário:', email);

      return res.json({
        user: userData,
        token
      });
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      return res.status(500).json({ error: 'Erro ao fazer login' });
    }
  }
}

function generateToken(params = {}) {
  // Usando a chave JWT_SECRET do arquivo .env ou uma chave padrão
  const secret = process.env.JWT_SECRET || 'meu_segredo_super_seguro_para_jwt';
  console.log('Gerando token JWT com secret:', secret);
  return jwt.sign(params, secret, {
    expiresIn: '1d',
  });
}

module.exports = new AuthController();