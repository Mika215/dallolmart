const router = require("express").Router();
const Order = require("../Models/Order");
const {
  verifyTokenAndAuth,
  verifyTokenAndAdmin,
  verifyToken,
} = require("../Middleware/verifyToken");

//create Order
//!how are we going to pass the user id in the clint side for now i am passing it on re.body using postman
router.post("/create", async (req, res) => {
  try {
    const newOrder = new Order(req.body);

    const savedOrder = await newOrder.save();
    res
      .status(200)
      .send(`Order saved sucsessfully!=>  order_id: ${savedOrder.id}`);
    console.log(savedOrder);
  } catch (err) {
    res.status(500).send(err);
    console.log(err);
  }
});

//update Order by id
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      {new: true}
    );
    res.status(200).send(updatedOrder);
    console.log(updatedOrder);
    console.log(`${updatedOrder.title} : edited`);
  } catch (err) {
    res.status(500).send(err);
  }
});

//delete Order by id

router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.status(200).send(`Order permanently deleted..`);
  } catch (err) {
    res.status(500).send(err);
  }
});

//get userOrders by userId
//!this is not working proprly it returns error
router.get("/find/:userId", verifyTokenAndAuth, async (req, res) => {
  try {
    const orders = await Order.find({userId: req.params.userId});

    res.status(200).send(orders);
  } catch (err) {
    res.status(500).send(err);
  }
});
//get all Orders
router.get("/", verifyTokenAndAdmin, async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).send(orders);
  } catch (err) {
    res.status(500).send(err);
  }
});

//GET monthly income Status
//!this returns edmpty array why?????
router.get("/income", verifyTokenAndAdmin, async (req, res) => {
  const date = new Date();
  console.log(date);
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  console.log(lastMonth);
  //!this has a bug check it out the month formation
  const previousMonth = new Date(lastMonth.setMonth(lastMonth.getMonth() - 1));
  console.log(previousMonth);
  try {
    const income = await Order.aggregate([
      {$match: {createdAt: {$gte: previousMonth}}},
      {
        $project: {
          month: {$month: "$createdAt"},
          sales: "$amount",
        },
      },
      {
        $group: {
          _id: "$month",
          total: {$sum: "$sales"},
        },
      },
    ]);
    res.status(200).send(income);
    console.log(income);
  } catch (err) {
    res.status(500).send(err);
  }
});

//!get orders by orderId this would be cool if users(only thier own verifyTokenAndAuth) and admins can search all orders using the orderId and it returns all detailes including order status amount products created date...

module.exports = router;
