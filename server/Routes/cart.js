const router = require("express").Router();
const Cart = require("../Models/Cart");
const {
  verifyTokenAndAuth,
  verifyTokenAndAdmin,
  verifyToken,
} = require("../Middleware/verifyToken");

//create cart
router.post("/create", async (req, res) => {
  try {
    const newCart = new Cart(req.body);

    const savedCart = await newCart.save();
    res
      .status(200)
      .send(`new cart saved sucsessfully! => : ${savedCart.title}`);
    console.log(savedCart);
  } catch (err) {
    res.status(500).send(err);
    console.log(err);
  }
});

//update Cart by id
router.put("/:id", verifyTokenAndAuth, async (req, res) => {
  try {
    const updatedCart = await Cart.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      {new: true}
    );
    res.status(200).send(updatedCart);
    console.log(updatedCart);
    console.log(`${updatedCart.title} : edited`);
  } catch (err) {
    res.status(500).send(err);
  }
});

//delete Cart by id

router.delete("/:id", verifyTokenAndAuth, async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);
    res.status(200).send(`Cart permanently deleted..`);
  } catch (err) {
    res.status(500).send(err);
  }
});

//get userCart by userId

router.get("/find/:userId",verifyTokenAndAuth, async (req, res) => {
  try {
    const Cart = await Cart.findOne({userId:req.params.userId});

    res.status(200).send(Cart);
  } catch (err) {
    res.status(500).send(err);
  }
});
//get all Carts
router.get("/",verifyTokenAndAdmin,async (req, res) => {
 

  try {
 
      const carts = await Cart.find();
    res.status(200).send(carts);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
