import {
  addToCart as addToCartService,
  getCart as getCartService,
  updateQuantity as updateQuantityService,
  removeItem as removeItemService,
} from "../services/cartService";

// Thêm sản phẩm vào giỏ hàng
let addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.user.id;

    await addToCartService(userId, productId, quantity);
    res.status(200).json({ message: "Product added to cart" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Lấy thông tin giỏ hàng
let getCart = async (req, res) => {
  try {
    const userId = req.user.id;

    const cartItems = await getCartService(userId);
    res.status(200).json({ cartItems });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Cập nhật số lượng sản phẩm trong giỏ hàng
let updateQuantity = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.user.id;

    await updateQuantityService(userId, productId, quantity);
    res.status(200).json({ message: "Quantity updated in cart" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Xóa sản phẩm khỏi giỏ hàng
let removeItem = async (req, res) => {
  try {
    const { productId } = req.body;
    const userId = req.user.id;

    await removeItemService(userId, productId);
    res.status(200).json({ message: "Product removed from cart" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addToCart,
  getCart,
  updateQuantity,
  removeItem,
};
