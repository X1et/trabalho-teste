const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'Token não fornecido' });
  }

  const parts = authHeader.split(' ');

  if (parts.length !== 2) {
    return res.status(401).json({ error: 'Erro no token' });
  }

  const [scheme, token] = parts;

  if (!/^Bearer$/i.test(scheme)) {
    return res.status(401).json({ error: 'Token mal formatado' });
  }

  try {
    const secret = process.env.JWT_SECRET || 'meu_segredo_super_seguro_para_jwt';
    const decoded = jwt.verify(token, secret);
    req.userId = decoded.id;
    return next();
  } catch (err) {
    console.error('Erro na verificação do token:', err);
    return res.status(401).json({ error: 'Token inválido' });
  }
};