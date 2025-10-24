const express = require('express');
const { User } = require('../models');
const authMiddleware = require('../middlewares/auth');

const router = express.Router();

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Retorna a lista de usuários
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de usuários
 *       401:
 *         description: Não autorizado
 */
router.get('/', authMiddleware, async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'name', 'email', 'role']
    });
    return res.json(users);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

module.exports = router;