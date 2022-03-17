const router = require("express").Router();
const stripe = require("stripe")(process.env.STRIPE_SEC_KEY);
const sendMail=require("../dallolEmail");




//charge payment

router.post("/payment", (req, res) => {
  const user=req.body.user;
  stripe.charges.create(
    {
      source: req.body.tokenId,
      amount: req.body.totalAmount,
      currency: "usd",
    },
    (stripeErr, stripeRes) => {
      if (stripeErr) {
        res.status(500).send(stripeErr);
      } else {
        // console.log(`New stripe payment has been made on ${new Date().toString().substring(0, 30)}`);
        // console.log(stripeRes)
        const msg = {
          from: "DallolMart || <mikacodes@gmail.com>",
          to: `${user.email}`,
          subject: "Order Summary",
          text: "This message was sent from DallolMart Server",
          html: `<h2>This message was sent from DallolMart Server</h2>
    
        <p>Dear <Strong> ${stripeRes.billing_details.name}</strong></p>

      
        <h4> We thank you for choosing <span>DallolMart</span> as your prefered shoping platform.</h4>
        <strong>Order Summary:</strong>
         <p> New stripe payment has been made on ${new Date().toString().substring(0, 30)}.</p>
        
        <p>Amount €${stripeRes.amount/100}.00 has been deducted from your ${stripeRes.payment_method_details.card.brand} card number:<span> **** ${stripeRes.payment_method_details.card.last4}</span></p>
        <p>We should deliver your orders within the next few days to your address@:<strong><b>${stripeRes.billing_details.address.line1},${stripeRes.billing_details.address.postal_code},<br>${stripeRes.billing_details.address.city},${stripeRes.billing_details.address.country}</strong></p>
        <strong>Payment Receipt:</strong> <a href="${stripeRes.receipt_url}">view receipt</a><b>
    
        <strong>Best Regards</strong>
        <p>Michael Tesfay<p>
        <strong>DallolMart</strong>`
        
        };
 sendMail(msg)
  .then((result) => console.log("Emailsent...", result))
  .catch((err) => console.log(error.message));
        console.log(user.email)
        res.status(200).send(stripeRes);
      }
    }
  );
});

module.exports = router;
