import { backendAPI } from "@/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getAccessToken } from "@/lib";
import RemoveFromCartForm from "./_components/RemoveFromCartForm";
import UpdateItemQuantityForm from "./_components/UpdateItemQuantityForm";

export const getCart = async () => {
  const accessToken = await getAccessToken();
  const response = await backendAPI.get(`/cart`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (response.status !== 200) {
    return null;
  }

  return response.data.cart;
};

export default async function Products() {
  const cart = await getCart();
  if (!cart || cart.items.length == 0) {
    return <div>Cart is empty</div>;
  }

  return (
    <>
      <div className='flex flex-col gap-4'>
        <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
          {cart.items.map((item: any) => (
            <Card key={item.id}>
              <CardHeader>
                <CardTitle>
                  <Link href={`/products/${item.product.code}`}>
                    {item.product.name}
                  </Link>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className='flex justify-between items-center'>
                  <span>Quantity: {item.quantity}</span>
                  <span>Price: ${item.product.price * item.quantity}</span>
                </div>
                <div className='flex flex-col justify-center items-center gap-4 mt-2'>
                  <UpdateItemQuantityForm
                    name={item.product.name}
                    itemId={item._id}
                    quantity={item.quantity}
                  />
                  <Button variant={"destructive"} asChild>
                    <RemoveFromCartForm
                      itemId={item._id}
                      name={item.product.name}
                    />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className='mt-8 flex justify-center'>
          <Button asChild size='lg'>
            <Link href='/checkout'>Proceed to Checkout</Link>
          </Button>
        </div>
      </div>
    </>
  );
}
