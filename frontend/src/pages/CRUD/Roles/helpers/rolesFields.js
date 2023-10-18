const rolesFields = {
  id: { type: 'id', label: 'ID' },

  name: { type: 'string', label: 'Name' },

  permissions: { type: 'relation_many', label: 'Permissions' },
};

export default rolesFields;
