import {
  createOrder as createOrderService,
  getOrders as getOrdersService,
  getOrderDetails as getOrderDetailsService,
  updateOrderStatus as updateOrderStatusService,
} from "../services/orderService";

// Tạo đơn hàng mới
export const createOrder = async (req, res) => {
  try {
    const userId = req.user.id;
    const { cartId } = req.body;

    const order = await createOrderService(userId, cartId);

    res.status(201).json({ message: "Order created successfully.", order });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Lấy tất cả đơn hàng của người dùng
export const getOrders = async (req, res) => {
  try {
    const userId = req.user.id;

    const orders = await getOrdersService(userId);

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Lấy chi tiết đơn hàng theo ID
export const getOrderDetails = async (req, res) => {
  try {
    const userId = req.user.id;
    const orderId = req.params.id;

    const order = await getOrderDetailsService(userId, orderId);

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Cập nhật trạng thái của đơn hàng
export const updateOrderStatus = async (req, res) => {
  try {
    const userId = req.user.id;
    const orderId = req.params.id;
    const { status } = req.body;

    const order = await updateOrderStatusService(userId, orderId, status);

    res
      .status(200)
      .json({ message: "Order status updated successfully.", order });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
