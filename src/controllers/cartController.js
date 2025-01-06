import db from '../models';

// Thêm sản phẩm vào giỏ hàng
let addToCart = async (req,res) => {
    try {
        const {productID, quantity} = req.body;
        const userId = req.user.id;

        // Tìm giỏ hàng có sẳn hoặc tạo mới giỏ hàng
        const cart = await db.Cart.findOne({ where : {userId, status: 'open'}});
        if (!cart) {
            cart = await db.Cart.create({userId});
        }
        
        // Kiểm tra sản phẩm đã tồn tại trong giỏ hàng hay chưa
        const cartItem = await db.CartItem.findOne({ where : {cartId: cart.id, productId}});
        if (cartItem) {
            // Nếu đã tồn tại, tăng số lượng
            cartItem.quantity += quantity;
            await cartItem.save();
        } else {
            // Nếu chưa tồn tại, thêm mới
            await db.CartItem.create({cartId: cart.id, productId, quantity, price : productID.price});
        }

        res.status(200).json({message: 'Product added to cart successfully'});
    } catch (error) {
        res.status(500).json({message: 'An error occurred while adding product to cart', error: error.message});
        }
    }

// Hiển thị giỏ hàng
let getCart = async (req, res) => {
    try {
        const userId = req.user.id;
        const cart = await db.Cart.findOne({ where : {userId, status: 'open'}});
        if (!cart) {
            return res.status(404).json({message: 'Cart not found'});
        }
        
        // Lấy danh sách sản phẩm trong giỏ hàng
        const cartItems = await db.CartItem.findAll({ where : {cartId: cart.id}}
            res.status(200).json({cartItems});
            
    } catch (error) {
        res.status(500).json({message: 'An error occurred while getting cart', error:
            error.message});
    }
    };
    
// Cập nhật số lượng sản phẩm trong giỏ hàng
let updateQuantity = async (req, res) => {
    try {
        const {productId, quantity} = req.body;
        const userId = req.user.id;
        const cart = await db.Cart.findOne({ where : {userId, status: 'open'}});
        if (!cart) {
            return res.status(404).json({message: 'Cart not found'});
        }
        
        // Tìm sản phẩm trong giỏ hàng
        const cartItem = await db.CartItem.findOne({ where : {cartId: cart.id, productId}});
        if (!cartItem) {
            return res.status(404).json({message: 'Product not found in cart'});
        }
        
        // Cập nhật số lượng
        cartItem.quantity = quantity;
        await cartItem.save();
        
        res.status(200).json({message: 'Quantity updated successfully'});
        } catch (error) {
            res.status(500).json({message: 'An error occurred while updating quantity', error:
                error.message});
        }
        }
        
// Xóa sản phẩm khỏi giỏ hàng
let removeItem = async (req, res) => {
    try {
        const {productId} = req.body;
        const userId = req.user.id;
        const cart = await db.Cart.findOne({ where : {userId, status: 'open'}});
        if (!cart) {
            return res.status(404).json({message: 'Cart not found'});
        }
        
        // Tìm sản phẩm trong giỏ hàng
        const cartItem = await db.CartItem.findOne({ where : {cartId: cart.id, productId}});
        if (!cartItem) {
            return res.status(404).json({message: 'Product not found in cart'});
        }
        
        // Xóa sản phẩm
        await cartItem.destroy();
        
        res.status(200).json({message: 'Product removed from cart successfully'});
        } catch (error) {
            res.status(500).json({message: 'An error occurred while removing product', error:
                error.message});
        }
        }
        module.exports ={
            addToCart,
            getCart,
            updateQuantity,
            removeItem
        }