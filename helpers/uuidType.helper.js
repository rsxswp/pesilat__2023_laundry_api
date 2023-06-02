module.exports = (Type) => {
  return {
    allowNull: false,
    primaryKey: true,
    type: Type.UUID,
    defaultValue: Type.UUIDV4,
  };
};
