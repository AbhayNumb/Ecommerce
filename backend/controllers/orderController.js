const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncError = require("../middleware/catchAsyncError");
//create order
exports.newOrder = catchAsyncError(async (req, res, next) => {
  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;
  const order = await Order.create({
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paidAt: Date.now(),
    user: req.user._id,
  });
  res.status(201).json({
    success: true,
    order,
  });
});

//get single order
exports.getSingleOrder = catchAsyncError(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );
  if (!order) {
    return next(
      new ErrorHandler(`Order Not Found with id :${req.params.id}`, 404)
    );
  }
  res.status(200).json({
    success: true,
    order,
  });
});

//get logged in user order
exports.myOrder = catchAsyncError(async (req, res, next) => {
  const order = await Order.find({ user: req.user._id });
  res.status(200).json({
    success: true,
    order,
  });
});

//get all orders--admin
exports.getAllOrders = catchAsyncError(async (req, res, next) => {
  const order = await Order.find();
  let totalAmount = 0;
  order.forEach((res) => {
    totalAmount += res.totalPrice;
  });
  res.status(200).json({
    success: true,
    order,
    totalAmount,
  });
});

//update order status--admin
exports.updateOrder = catchAsyncError(async (req, res, next) => {
  const order = await Order.findById(req.params.id);
  if (!order) {
    return next(
      new ErrorHandler(`Order Not Found with id :${req.params.id}`, 404)
    );
  }
  if (order.orderStatus === "Delievered") {
    return next(new ErrorHandler("You have already Delieverd this order", 400));
  }
  order.orderItems.forEach(async (order) => {
    await updateStock(order.product, order.quantity);
  });
  order.orderStatus = req.body.status;
  if (req.body.status === "Delievered") {
    order.deliveredAt = Date.now();
  }
  await order.save({ validateBeforeSave: false });
  res.status(200).json({
    success: true,
    order,
  });
});

async function updateStock(id, quantity) {
  const product = await Product.findById(id);
  product.Stock -= quantity;
  product.save({ validateBeforeSave: false });
}

//get all orders--admin
exports.getAllOrders = catchAsyncError(async (req, res, next) => {
  const order = await Order.find();
  let totalAmount = 0;
  order.forEach((res) => {
    totalAmount += res.totalPrice;
  });
  res.status(200).json({
    success: true,
    order,
    totalAmount,
  });
});

//update order status--admin
exports.deleteOrder = catchAsyncError(async (req, res, next) => {
  const order = await Order.findById(req.params.id);
  if (!order) {
    return next(
      new ErrorHandler(`Order Not Found with id :${req.params.id}`, 404)
    );
  }
  await order.deleteOne({ id: order._id });
  res.status(200).json({
    success: true,
  });
});
