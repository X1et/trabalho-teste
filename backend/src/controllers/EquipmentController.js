const { Equipment, User } = require('../models');

class EquipmentController {
  async index(req, res) {
    try {
      const equipments = await Equipment.findAll({
        include: [
          {
            model: User,
            as: 'responsible',
            attributes: ['id', 'name', 'email']
          }
        ]
      });
      return res.json(equipments);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao listar equipamentos' });
    }
  }

  async show(req, res) {
    try {
      const equipment = await Equipment.findByPk(req.params.id, {
        include: [
          {
            model: User,
            as: 'responsible',
            attributes: ['id', 'name', 'email']
          }
        ]
      });

      if (!equipment) {
        return res.status(404).json({ error: 'Equipamento não encontrado' });
      }

      return res.json(equipment);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao buscar equipamento' });
    }
  }

  async store(req, res) {
    try {
      const { 
        name, 
        description, 
        serial_number, 
        acquisition_date, 
        status, 
        location, 
        responsible_id 
      } = req.body;

      // Verificar se o número de série já existe
      const equipmentExists = await Equipment.findOne({ where: { serial_number } });
      if (equipmentExists) {
        return res.status(400).json({ error: 'Já existe um equipamento com este número de série' });
      }

      // Verificar se o responsável existe, se fornecido
      if (responsible_id) {
        const responsibleExists = await User.findByPk(responsible_id);
        if (!responsibleExists) {
          return res.status(400).json({ error: 'Responsável não encontrado' });
        }
      }

      const equipment = await Equipment.create({
        name,
        description,
        serial_number,
        acquisition_date,
        status,
        location,
        responsible_id
      });

      return res.status(201).json(equipment);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao cadastrar equipamento' });
    }
  }

  async update(req, res) {
    try {
      const { 
        name, 
        description, 
        serial_number, 
        acquisition_date, 
        status, 
        location, 
        responsible_id 
      } = req.body;

      const equipment = await Equipment.findByPk(req.params.id);

      if (!equipment) {
        return res.status(404).json({ error: 'Equipamento não encontrado' });
      }

      // Verificar se o número de série já existe em outro equipamento
      if (serial_number && serial_number !== equipment.serial_number) {
        const serialExists = await Equipment.findOne({ 
          where: { serial_number },
          attributes: ['id']
        });
        
        if (serialExists && serialExists.id !== equipment.id) {
          return res.status(400).json({ error: 'Já existe um equipamento com este número de série' });
        }
      }

      // Verificar se o responsável existe, se fornecido
      if (responsible_id) {
        const responsibleExists = await User.findByPk(responsible_id);
        if (!responsibleExists) {
          return res.status(400).json({ error: 'Responsável não encontrado' });
        }
      }

      await equipment.update({
        name: name || equipment.name,
        description: description !== undefined ? description : equipment.description,
        serial_number: serial_number || equipment.serial_number,
        acquisition_date: acquisition_date || equipment.acquisition_date,
        status: status || equipment.status,
        location: location !== undefined ? location : equipment.location,
        responsible_id: responsible_id !== undefined ? responsible_id : equipment.responsible_id
      });

      return res.json(equipment);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao atualizar equipamento' });
    }
  }

  async destroy(req, res) {
    try {
      const equipment = await Equipment.findByPk(req.params.id);

      if (!equipment) {
        return res.status(404).json({ error: 'Equipamento não encontrado' });
      }

      await equipment.destroy();

      return res.status(204).send();
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao excluir equipamento' });
    }
  }
}

module.exports = new EquipmentController();