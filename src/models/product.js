"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Subcategory, { foreignKey: "subcategory_id" });
    }
  }
  Product.init(
    {
      subcategory_id: DataTypes.INTEGER,
      name: DataTypes.STRING,
      description: DataTypes.TEXT,
      quantity: DataTypes.INTEGER,
      price: DataTypes.DECIMAL(15, 2),
    },
    {
      sequelize,
      modelName: "Product",
    }
  );
  return Product;
};
