const express = require('express');
const EquipmentController = require('../controllers/EquipmentController');
const authMiddleware = require('../middlewares/auth');

const router = express.Router();

// Todas as rotas exigem autenticação
router.use(authMiddleware);

/**
 * @swagger
 * /api/equipment:
 *   get:
 *     summary: Lista todos os equipamentos
 *     tags: [Equipamentos]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de equipamentos
 *       401:
 *         description: Não autorizado
 */
router.get('/', EquipmentController.index);

/**
 * @swagger
 * /api/equipment/{id}:
 *   get:
 *     summary: Obtém um equipamento pelo ID
 *     tags: [Equipamentos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Detalhes do equipamento
 *       404:
 *         description: Equipamento não encontrado
 */
router.get('/:id', EquipmentController.show);

/**
 * @swagger
 * /api/equipment:
 *   post:
 *     summary: Cadastra um novo equipamento
 *     tags: [Equipamentos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - serial_number
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               serial_number:
 *                 type: string
 *               acquisition_date:
 *                 type: string
 *                 format: date
 *               status:
 *                 type: string
 *                 enum: [available, in_use, maintenance, retired]
 *               location:
 *                 type: string
 *               responsible_id:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Equipamento criado com sucesso
 *       400:
 *         description: Dados inválidos
 */
router.post('/', EquipmentController.store);

/**
 * @swagger
 * /api/equipment/{id}:
 *   put:
 *     summary: Atualiza um equipamento
 *     tags: [Equipamentos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               serial_number:
 *                 type: string
 *               acquisition_date:
 *                 type: string
 *                 format: date
 *               status:
 *                 type: string
 *                 enum: [available, in_use, maintenance, retired]
 *               location:
 *                 type: string
 *               responsible_id:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Equipamento atualizado com sucesso
 *       404:
 *         description: Equipamento não encontrado
 */
router.put('/:id', EquipmentController.update);

/**
 * @swagger
 * /api/equipment/{id}:
 *   delete:
 *     summary: Remove um equipamento
 *     tags: [Equipamentos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Equipamento removido com sucesso
 *       404:
 *         description: Equipamento não encontrado
 */
router.delete('/:id', EquipmentController.destroy);

module.exports = router;