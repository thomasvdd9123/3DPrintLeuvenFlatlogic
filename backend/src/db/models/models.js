const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const models = sequelize.define(
    'models',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      name: {
        type: DataTypes.TEXT,
      },

      material: {
        type: DataTypes.TEXT,
      },

      color: {
        type: DataTypes.TEXT,
      },

      finish: {
        type: DataTypes.TEXT,
      },

      scale: {
        type: DataTypes.INTEGER,
      },

      length: {
        type: DataTypes.INTEGER,
      },

      width: {
        type: DataTypes.INTEGER,
      },

      height: {
        type: DataTypes.INTEGER,
      },

      quantity: {
        type: DataTypes.INTEGER,
      },

      price: {
        type: DataTypes.DECIMAL,
      },

      importHash: {
        type: DataTypes.STRING(255),
        allowNull: true,
        unique: true,
      },
    },
    {
      timestamps: true,
      paranoid: true,
      freezeTableName: true,
    },
  );

  models.associate = (db) => {
    /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    //end loop

    db.models.hasMany(db.file, {
      as: 'file',
      foreignKey: 'belongsToId',
      constraints: false,
      scope: {
        belongsTo: db.models.getTableName(),
        belongsToColumn: 'file',
      },
    });

    db.models.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.models.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return models;
};
