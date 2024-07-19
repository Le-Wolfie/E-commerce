import { backendAPI } from "@/api";
import { getAccessToken } from "@/lib";
import { getCart } from "../../cart/page";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const createOrder = async (cart: any) => {
  const accessToken = await getAccessToken();
  const requestBody = {
    items: cart.items,
    totalPrice: cart.totalPrice,
  };

  const response = await backendAPI.post(`/checkout`, requestBody, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (response.status !== 201) {
    throw new Error(
      response.data.errors.map((error: any) => error.message).join(", ")
    );
  }

  return response.data;
};

export default async function Page() {
  const cart = await getCart();
  const order = await createOrder(cart);

  return (
    <>
      <h1>Order successful!</h1>
      <p>Thank you for your purchase!</p>
      <p>Your order number is {order.order._id}</p>
      <p>
        You can track your order status{" "}
        <Button className='text-3xl' variant={"link"} asChild>
          <Link href='/orders'>Here</Link>
        </Button>
      </p>
    </>
  );
}
