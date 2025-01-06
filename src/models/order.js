"use strict";
module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define(
    "Order",
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "pending",
      },
      totalPrice: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
    },
    {}
  );

  Order.associate = function (models) {
    Order.belongsTo(models.User, { foreignKey: "userId", onDelete: "CASCADE" });
    Order.hasMany(models.OrderItem, {
      foreignKey: "orderId",
      onDelete: "CASCADE",
    });
  };

  return Order;
};
