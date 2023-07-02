import { mongooseConnect } from "../../lib/mongoose";
const stripe = require("stripe")(process.env.STRIPE_SK);
import { buffer } from "micro";
import { Order } from "../../models/Order";

/*
!stale chyba s paid stavom 
*/

const endpointSecret =
  "whsec_825a33769bf42ee00465653d87809cfaf9b005366e07634230883d3177ecdc40";
  
export default async function handler(req, res) {
  await mongooseConnect();
  const sig = req.headers['stripe-signature'];

  let event;

  try {
    event = stripe.webhooks.constructEvent(await buffer(req), sig, endpointSecret);
  } catch (err) {
    console.error(err);
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed':
      const data = event.data.object;
      console.log("Received checkout.session.completed event:");
      console.log(data);
      const orderId = data.metadata.orderId;
      console.log("Order ID:", orderId);
      const paid = data.payment_status === 'paid';
      console.log("Payment Status:", paid);
      if (orderId && paid) {
        try {
          const updatedOrder = await Order.findByIdAndUpdate(orderId, { paid: true }, { new: true });
          console.log("Updated Order:", updatedOrder);
        } catch (error) {
          console.error("Error updating order:", error);
        }
      }
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.status(200).send('ok');
}

export const config = {
  api: { bodyParser: false }
};
