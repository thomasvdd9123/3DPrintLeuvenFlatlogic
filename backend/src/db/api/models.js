const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class ModelsDBApi {
  static async create(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const models = await db.models.create(
      {
        id: data.id || undefined,

        name: data.name || null,
        material: data.material || null,
        color: data.color || null,
        finish: data.finish || null,
        scale: data.scale || null,
        length: data.length || null,
        width: data.width || null,
        height: data.height || null,
        quantity: data.quantity || null,
        price: data.price || null,
        importHash: data.importHash || null,
        createdById: currentUser.id,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await FileDBApi.replaceRelationFiles(
      {
        belongsTo: db.models.getTableName(),
        belongsToColumn: 'file',
        belongsToId: models.id,
      },
      data.file,
      options,
    );

    return models;
  }

  static async bulkImport(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    // Prepare data - wrapping individual data transformations in a map() method
    const modelsData = data.map((item) => ({
      id: item.id || undefined,

      name: item.name || null,
      material: item.material || null,
      color: item.color || null,
      finish: item.finish || null,
      scale: item.scale || null,
      length: item.length || null,
      width: item.width || null,
      height: item.height || null,
      quantity: item.quantity || null,
      price: item.price || null,
      importHash: item.importHash || null,
      createdById: currentUser.id,
      updatedById: currentUser.id,
    }));

    // Bulk create items
    const models = await db.models.bulkCreate(modelsData, { transaction });

    // For each item created, replace relation files

    for (let i = 0; i < models.length; i++) {
      await FileDBApi.replaceRelationFiles(
        {
          belongsTo: db.models.getTableName(),
          belongsToColumn: 'file',
          belongsToId: models[i].id,
        },
        data[i].file,
        options,
      );
    }

    return models;
  }

  static async update(id, data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const models = await db.models.findByPk(id, {
      transaction,
    });

    await models.update(
      {
        name: data.name || null,
        material: data.material || null,
        color: data.color || null,
        finish: data.finish || null,
        scale: data.scale || null,
        length: data.length || null,
        width: data.width || null,
        height: data.height || null,
        quantity: data.quantity || null,
        price: data.price || null,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await FileDBApi.replaceRelationFiles(
      {
        belongsTo: db.models.getTableName(),
        belongsToColumn: 'file',
        belongsToId: models.id,
      },
      data.file,
      options,
    );

    return models;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const models = await db.models.findByPk(id, options);

    await models.update(
      {
        deletedBy: currentUser.id,
      },
      {
        transaction,
      },
    );

    await models.destroy({
      transaction,
    });

    return models;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;

    const models = await db.models.findOne({ where }, { transaction });

    if (!models) {
      return models;
    }

    const output = models.get({ plain: true });

    output.file = await models.getFile({
      transaction,
    });

    return output;
  }

  static async findAll(filter, options) {
    var limit = filter.limit || 0;
    var offset = 0;
    const currentPage = +filter.page;

    offset = currentPage * limit;

    var orderBy = null;

    const transaction = (options && options.transaction) || undefined;
    let where = {};
    let include = [
      {
        model: db.file,
        as: 'file',
      },
    ];

    if (filter) {
      if (filter.id) {
        where = {
          ...where,
          ['id']: Utils.uuid(filter.id),
        };
      }

      if (filter.name) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('models', 'name', filter.name),
        };
      }

      if (filter.material) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('models', 'material', filter.material),
        };
      }

      if (filter.color) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('models', 'color', filter.color),
        };
      }

      if (filter.finish) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('models', 'finish', filter.finish),
        };
      }

      if (filter.scaleRange) {
        const [start, end] = filter.scaleRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            scale: {
              ...where.scale,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            scale: {
              ...where.scale,
              [Op.lte]: end,
            },
          };
        }
      }

      if (filter.lengthRange) {
        const [start, end] = filter.lengthRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            length: {
              ...where.length,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            length: {
              ...where.length,
              [Op.lte]: end,
            },
          };
        }
      }

      if (filter.widthRange) {
        const [start, end] = filter.widthRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            width: {
              ...where.width,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            width: {
              ...where.width,
              [Op.lte]: end,
            },
          };
        }
      }

      if (filter.heightRange) {
        const [start, end] = filter.heightRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            height: {
              ...where.height,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            height: {
              ...where.height,
              [Op.lte]: end,
            },
          };
        }
      }

      if (filter.quantityRange) {
        const [start, end] = filter.quantityRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            quantity: {
              ...where.quantity,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            quantity: {
              ...where.quantity,
              [Op.lte]: end,
            },
          };
        }
      }

      if (filter.priceRange) {
        const [start, end] = filter.priceRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            price: {
              ...where.price,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            price: {
              ...where.price,
              [Op.lte]: end,
            },
          };
        }
      }

      if (
        filter.active === true ||
        filter.active === 'true' ||
        filter.active === false ||
        filter.active === 'false'
      ) {
        where = {
          ...where,
          active: filter.active === true || filter.active === 'true',
        };
      }

      if (filter.createdAtRange) {
        const [start, end] = filter.createdAtRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            ['createdAt']: {
              ...where.createdAt,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            ['createdAt']: {
              ...where.createdAt,
              [Op.lte]: end,
            },
          };
        }
      }
    }

    let { rows, count } = options?.countOnly
      ? {
          rows: [],
          count: await db.models.count({
            where,
            include,
            distinct: true,
            limit: limit ? Number(limit) : undefined,
            offset: offset ? Number(offset) : undefined,
            order:
              filter.field && filter.sort
                ? [[filter.field, filter.sort]]
                : [['createdAt', 'desc']],
            transaction,
          }),
        }
      : await db.models.findAndCountAll({
          where,
          include,
          distinct: true,
          limit: limit ? Number(limit) : undefined,
          offset: offset ? Number(offset) : undefined,
          order:
            filter.field && filter.sort
              ? [[filter.field, filter.sort]]
              : [['createdAt', 'desc']],
          transaction,
        });

    //    rows = await this._fillWithRelationsAndFilesForRows(
    //      rows,
    //      options,
    //    );

    return { rows, count };
  }

  static async findAllAutocomplete(query, limit) {
    let where = {};

    if (query) {
      where = {
        [Op.or]: [
          { ['id']: Utils.uuid(query) },
          Utils.ilike('models', 'id', query),
        ],
      };
    }

    const records = await db.models.findAll({
      attributes: ['id', 'id'],
      where,
      limit: limit ? Number(limit) : undefined,
      orderBy: [['id', 'ASC']],
    });

    return records.map((record) => ({
      id: record.id,
      label: record.id,
    }));
  }
};
