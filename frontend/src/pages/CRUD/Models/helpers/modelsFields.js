const modelsFields = {
  id: { type: 'id', label: 'ID' },

  file: {
    type: 'files',
    label: 'File',

    options: [{ value: 'value', label: 'value' }],
  },

  name: {
    type: 'string',
    label: 'Name',

    options: [{ value: 'value', label: 'value' }],
  },

  material: {
    type: 'string',
    label: 'Material',

    options: [{ value: 'value', label: 'value' }],
  },

  color: {
    type: 'string',
    label: 'Color',

    options: [{ value: 'value', label: 'value' }],
  },

  finish: {
    type: 'string',
    label: 'Finish',

    options: [{ value: 'value', label: 'value' }],
  },

  scale: {
    type: 'int',
    label: 'Scale',

    options: [{ value: 'value', label: 'value' }],
  },

  length: {
    type: 'int',
    label: 'Length',

    options: [{ value: 'value', label: 'value' }],
  },

  width: {
    type: 'int',
    label: 'Width',

    options: [{ value: 'value', label: 'value' }],
  },

  height: {
    type: 'int',
    label: 'Height',

    options: [{ value: 'value', label: 'value' }],
  },

  quantity: {
    type: 'int',
    label: 'Quantity',

    options: [{ value: 'value', label: 'value' }],
  },

  price: {
    type: 'decimal',
    label: 'Price',

    options: [{ value: 'value', label: 'value' }],
  },
};

export default modelsFields;
