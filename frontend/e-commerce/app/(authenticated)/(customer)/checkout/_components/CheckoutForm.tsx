"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Elements,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Link from "next/link";
import { FormEvent, useState } from "react";

// Initialize Stripe
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string
);

export default function CheckoutForm({ clientSecret, cart }: any) {
  return (
    <div className='max-w-5xl w-full mx-auto space-y-8'>
      <h1 className='text-2xl font-semibold'>Checkout</h1>
      <Elements options={{ clientSecret }} stripe={stripePromise}>
        <div className='flex items-center justify-center gap-4 flex-wrap'>
          {cart.items.map((item: any, index: any) => (
            <Card key={index} className='w-full md:w-1/2 lg:w-1/3'>
              <CardHeader>
                <CardTitle>
                  <Link
                    href={`/products/${item.product.code}`}
                    className='flex w-min'
                  >
                    <span className='flex text-nowrap'>
                      {item.product.name}
                    </span>
                  </Link>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className='flex space-x-8 items-center'>
                  <span>Quantity: {item.quantity}</span>
                  <span>Price: ${item.product.price * item.quantity}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <Form cart={cart} />
      </Elements>
    </div>
  );
}

function Form({ cart }: any) {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${process.env.NEXT_PUBLIC_URL}/stripe/purchase-success`,
      },
    });

    if (error) {
      setErrorMessage(error.message || "An unexpected error occurred.");
      console.error("Error during payment:", error.message);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>Payment</CardTitle>
        </CardHeader>
        <CardContent>
          <PaymentElement />
          {errorMessage && (
            <div className='text-red-600 mt-2'>{errorMessage}</div>
          )}
          <div className='flex justify-center mt-4'>
            <Button
              className='w-full'
              type='submit'
              disabled={!stripe || !elements || cart.items.length === 0}
            >
              Pay ${cart.totalPrice}
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  );
}
