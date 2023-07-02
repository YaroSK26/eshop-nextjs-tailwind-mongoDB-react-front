import { mongooseConnect } from "../../lib/mongoose";
import stripe from "stripe";
import { buffer } from "micro";
import { Order } from "../../models/Order";

/*
!stale chyba s paid stavom 
*/

const endpointSecret =
  "whsec_825a33769bf42ee00465653d87809cfaf9b005366e07634230883d3177ecdc40";

// Inicializace Stripe
const stripeClient = stripe(process.env.STRIPE_SK);

export default async function handler(req, res) {
  // Připojení k MongoDB
  await mongooseConnect();

  const sig = req.headers["stripe-signature"];
  let event;

  try {
    // Získání události ze Stripe
    event = stripeClient.webhooks.constructEvent(
      await buffer(req),
      sig,
      endpointSecret
    );
  } catch (err) {
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  // Zpracování události
  switch (event.type) {
    case "payment_intent.succeeded":
      const paymentIntent = event.data.object;
      const orderId = paymentIntent.metadata.orderId;

      console.log("Payment succeeded for order:", orderId);

      // Aktualizace stavu objednávky v MongoDB
      try {
        const updatedOrder = await Order.findByIdAndUpdate(
          orderId,
          { paid: true },
          { new: true }
        );
        console.log("Updated order:", updatedOrder);
      } catch (error) {
        console.log("Error updating order:", error);
      }

      break;
    case "payment_intent.payment_failed":
      const failedPaymentIntent = event.data.object;
      const failedOrderId = failedPaymentIntent.metadata.orderId;

      console.log("Payment failed for order:", failedOrderId);

      // Případné další zpracování neúspěšné platby

      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.status(200).send("ok");
}

export const config = {
  api: {
    bodyParser: false,
  },
};
