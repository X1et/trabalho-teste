const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Equipment extends Model {
    static associate(models) {
      Equipment.belongsTo(models.User, { foreignKey: 'responsible_id', as: 'responsible' });
    }
  }

  Equipment.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    serial_number: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    acquisition_date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    status: {
      type: DataTypes.ENUM('available', 'in_use', 'maintenance', 'retired'),
      defaultValue: 'available'
    },
    location: {
      type: DataTypes.STRING,
      allowNull: true
    },
    responsible_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Users',
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'Equipment',
  });

  return Equipment;
};