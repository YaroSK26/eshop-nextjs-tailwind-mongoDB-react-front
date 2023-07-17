import { mongooseConnect } from "../../lib/mongoose";
import { buffer } from "micro";
import { Order } from "../../models/Order";
import { stripe } from "../../lib/stripe";

const endpointSecret =  "whsec_825a33769bf42ee00465653d87809cfaf9b005366e07634230883d3177ecdc40";

export default async function handler(req, res) {
  await mongooseConnect();
  const sig = req.headers["stripe-signature"];

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      await buffer(req),
      sig,
      endpointSecret
    );
  } catch (err) {
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  // Handle the event
  switch (event.type) {
    case "checkout.session.completed":
      const session = event.data.object;
      const userEmail = session.customer_email;
      const orderId = session.metadata.orderId;
      const paid = session.payment_status === "paid";

      if (orderId && userEmail && paid) {
        const order = await Order.findById(orderId);
        if (order && order.userEmail === userEmail) {
          order.paid = true;
          await order.save();
        }
      }
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.status(200).send("ok");
}

export const config = {
  api: { bodyParser: false },
};
