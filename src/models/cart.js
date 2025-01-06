"use strict";
module.exports = (sequelize, DataTypes) => {
  const Cart = sequelize.define(
    "Cart",
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "open",
      },
    },
    {}
  );

  Cart.associate = function (models) {
    Cart.belongsTo(models.User, { foreignKey: "userId", onDelete: "CASCADE" });
    Cart.hasMany(models.CartItem, {
      foreignKey: "cartId",
      onDelete: "CASCADE",
    });
  };

  return Cart;
};
