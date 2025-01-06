import db from "../models";

// Tạo đơn hàng mới
let createOrder = async (req, res) => {
  try {
    const userID = req.user.id;
    const { cartID } = req.body;

    const cart = await db.Cart.findOne({
      where: { id: cartID, userID, status: "open" },
      include: [db.CartItem],
    });

    if (!cart || cart.CartItems.length === 0) {
      return res.status(400).json({ message: "Cart is empty or not found." });
    }

    const totalPrice = cart.CartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );

    const order = await db.Order.create({
      userID: userID,
      totalPrice,
    });

    for (const item of cart.CartItems) {
      await db.OrderItem.create({
        orderID: order.id,
        productID: item.productID,
        quantity: item.quantity,
        price: item.price,
      });
    }

    cart.status = "complete";
    await cart.save();

    return res.json({ message: "Order created successfully.", order });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while creating the order",
      error: error.message,
    });
  }
};

// Lấy tất cả đơn hàng của người dùng
let getOrders = async (req, res) => {
  try {
    const userID = req.user.id;
    const orders = await db.Order.findAll({
      where: { userID },
      include: [{ model: db.OrderItem, include: [db.Product] }],
    });
    return res.json(orders);
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while getting orders",
      error: error.message,
    });
  }
};

// Lấy chi tiết đơn hàng theo ID
let getOrderDetails = async (req, res) => {
  try {
    const userID = req.user.id;
    const orderId = req.params.id;

    const order = await db.Order.findOne({
      where: { userID, id: orderId },
      include: [{ model: db.OrderItem, include: [db.Product] }],
    });

    if (!order) {
      return res.status(404).json({ message: "Order not found." });
    }
    return res.json(order);
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while getting order details",
      error: error.message,
    });
  }
};

// Cập nhật trạng thái của đơn hàng
let updateOrderStatus = async (req, res) => {
  try {
    const orderId = req.params.id;
    const { status } = req.body;
    const userID = req.user.id;

    const order = await db.Order.findOne({
      where: { id: orderId, userID },
    });

    if (!order) {
      return res.status(404).json({ message: "Order not found." });
    }

    order.status = status;
    await order.save();
    return res.json({ message: "Order status updated successfully.", order });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while updating order status",
      error: error.message,
    });
  }
};

export { createOrder, getOrders, getOrderDetails, updateOrderStatus };
