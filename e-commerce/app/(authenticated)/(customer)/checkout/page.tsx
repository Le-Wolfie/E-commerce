import { getCart } from "../cart/page";
import Stripe from "stripe";
import CheckoutForm from "./_components/CheckoutForm";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export default async function Checkout() {
  const cart = await getCart();
  if (!cart) {
    return <div>Cart is empty</div>;
  }

  const paymentIntent = await stripe.paymentIntents.create({
    amount: cart.totalPrice * 100,
    currency: "USD",
    metadata: { cartId: cart._id },
  });

  if (paymentIntent.client_secret === undefined) {
    throw new Error("Client secret is undefined");
  }

  return (
    <>
      <CheckoutForm clientSecret={paymentIntent.client_secret} cart={cart} />
    </>
  );
}
