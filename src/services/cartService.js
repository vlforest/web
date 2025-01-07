import db from "../models";

// Thêm sản phẩm vào trong giỏ hàng

let addToCart = async (userId, productId, quantity) => {
  try {
    // Tìm giỏ hàng trong cơ sở dữ liệu
    const cart = await db.Cart.findOne({ where: { userId, status: "open" } });

    // Nếu giỏ hàng không tồn tại, tạo mới
    if (!cart) {
      cart = await db.Cart.create({ userId });
    }

    // Kiểm tra sản phẩm đã tồn tại trong giỏ hàng hay chưa
    const cartItem = await db.CartItem.findOne({
      where: { cartId: cart.id, productId },
    });

    // Nếu đã tồn tại, tăng số lượng
    if (cartItem) {
      cartItem.quantity += quantity;
      await cartItem.save();
    } else {
      // Nếu chưa tồn tại, thêm mới
      await db.CartItem.create({
        cartId: cart.id,
        productId,
        quantity,
        price: productId.price,
      });
    }

    return { message: "Product added to cart successfully" };
  } catch (error) {
    throw new Error({
      message: "An error occurred while adding product to cart",
      error: error.message,
    });
  }
};

// Hiển thị giỏ hàng

let getCart = async (userId) => {
  try {
    // Tìm giỏ hàng trong cơ sở dữ liệu
    const cart = await db.Cart.findOne({ where: { userId, status: "open" } });

    // Nếu giỏ hàng không tồn tại, trả về rỗng
    if (!cart) {
      throw new Error("Cart not found");
    }

    // Lấy danh sách sản phẩm trong giỏ hàng
    const cartItems = await db.CartItem.findAll({ where: { cartId: cart.id } });
    return { cartItems };
  } catch (error) {
    throw new Error({
      message: "An error occurred while getting cart",
      error: error.message,
    });
  }
};

// Cập nhật số lượng sản phẩm trong giỏ hàng

let updateQuantity = async (userId, productId, quantity) => {
  try {
    // Tìm giỏ hàng trong cơ sở dữ liệu
    const cart = await db.Cart.findOne({ where: { userId, status: "open" } });

    // Nếu giỏ hàng không tồn tại, trả về lỗi
    if (!cart) {
      throw new Error("Cart not found");
    }

    // Tìm sản phẩm trong giỏ hàng
    const cartItem = await db.CartItem.findOne({
      where: { cartId: cart.id, productId },
    });

    // Nếu sản phẩm không tồn tại, trả về lỗi
    if (!cartItem) {
      throw new Error("Product not found in cart");
    }

    // Cập nhật số lượng
    cartItem.quantity = quantity;
    await cartItem.save();

    return { message: "Quantity updated successfully" };
  } catch (error) {
    throw new Error({
      message: "An error occurred while updating quantity",
      error: error.message,
    });
  }
};

// Xóa sản phẩm khỏi giỏ hàng
let removeItem = async (userId, productId) => {
  try {
    // Tìm giỏ hàng trong cơ sở dữ liệu
    const cart = await db.Cart.findOne({ where: { userId, status: "open" } });

    // Nếu giỏ hàng không tồn tại, trả về lỗi
    if (!cart) {
      throw new Error("Cart not found");
    }

    // Tìm sản phẩm trong gi�� hàng
    const cartItem = await db.CartItem.findOne({
      where: { cartId: cart.id, productId },
    });

    // Nếu sản phẩm không tồn tại, trả về l��i
    if (!cartItem) {
      throw new Error("Product not found in cart");
    }

    // Xóa sản phẩm khỏi giỏ hàng
    await cartItem.destroy();

    return { message: "Product removed from cart successfully" };
  } catch (error) {
    throw new Error({
      message: "An error occurred while removing product",
      error: error.message,
    });
  }
};

module.exports = {
  addToCart,
  getCart,
  updateQuantity,
  removeItem,
};
