module.exports = {
  /**
   * @param {QueryInterface} queryInterface
   * @param {Sequelize} Sequelize
   * @returns {Promise<void>}
   */
  async up(queryInterface, Sequelize) {
    /**
     * @type {Transaction}
     */
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.addColumn(
        'models',
        'name',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'models',
        'material',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'models',
        'color',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'models',
        'finish',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'models',
        'scale',
        {
          type: Sequelize.DataTypes.INTEGER,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'models',
        'length',
        {
          type: Sequelize.DataTypes.INTEGER,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'models',
        'width',
        {
          type: Sequelize.DataTypes.INTEGER,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'models',
        'height',
        {
          type: Sequelize.DataTypes.INTEGER,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'models',
        'quantity',
        {
          type: Sequelize.DataTypes.INTEGER,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'models',
        'price',
        {
          type: Sequelize.DataTypes.DECIMAL,
        },
        { transaction },
      );

      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  },
  /**
   * @param {QueryInterface} queryInterface
   * @param {Sequelize} Sequelize
   * @returns {Promise<void>}
   */
  async down(queryInterface, Sequelize) {
    /**
     * @type {Transaction}
     */
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.removeColumn('models', 'price', { transaction });

      await queryInterface.removeColumn('models', 'quantity', { transaction });

      await queryInterface.removeColumn('models', 'height', { transaction });

      await queryInterface.removeColumn('models', 'width', { transaction });

      await queryInterface.removeColumn('models', 'length', { transaction });

      await queryInterface.removeColumn('models', 'scale', { transaction });

      await queryInterface.removeColumn('models', 'finish', { transaction });

      await queryInterface.removeColumn('models', 'color', { transaction });

      await queryInterface.removeColumn('models', 'material', { transaction });

      await queryInterface.removeColumn('models', 'name', { transaction });

      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  },
};
