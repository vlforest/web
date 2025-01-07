import db from "../models";

// Tạo đơn hàng mới
export const createOrder = async (userId, cartId) => {
  try {
    const cart = await db.Cart.findOne({
      where: { id: cartId, userId, status: "open" },
      include: [db.CartItem],
    });

    if (!cart || cart.CartItems.length === 0) {
      throw new Error("Cart is empty or not found.");
    }

    const totalPrice = cart.CartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );

    const order = await db.Order.create({
      userId,
      totalPrice,
    });

    for (const item of cart.CartItems) {
      await db.OrderItem.create({
        orderId: order.id,
        productId: item.productId,
        quantity: item.quantity,
        price: item.price,
      });
    }

    cart.status = "complete";
    await cart.save();

    return order;
  } catch (error) {
    throw new Error(
      `An error occurred while creating the order: ${error.message}`
    );
  }
};

// Lấy tất cả đơn hàng của người dùng
export const getOrders = async (userId) => {
  try {
    const orders = await db.Order.findAll({
      where: { userId },
      include: [{ model: db.OrderItem, include: [db.Product] }],
    });
    return orders;
  } catch (error) {
    throw new Error(`An error occurred while getting orders: ${error.message}`);
  }
};

// Lấy chi tiết đơn hàng theo ID
export const getOrderDetails = async (userId, orderId) => {
  try {
    const order = await db.Order.findOne({
      where: { userId, id: orderId },
      include: [{ model: db.OrderItem, include: [db.Product] }],
    });

    if (!order) {
      throw new Error("Order not found.");
    }
    return order;
  } catch (error) {
    throw new Error(
      `An error occurred while getting order details: ${error.message}`
    );
  }
};

// Cập nhật trạng thái của đơn hàng
export const updateOrderStatus = async (userId, orderId, status) => {
  try {
    const order = await db.Order.findOne({
      where: { id: orderId, userId },
    });

    if (!order) {
      throw new Error("Order not found.");
    }

    order.status = status;
    await order.save();
    return order;
  } catch (error) {
    throw new Error(
      `An error occurred while updating order status: ${error.message}`
    );
  }
};
