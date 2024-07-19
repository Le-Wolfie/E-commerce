import { backendAPI } from "@/api";
import { getAccessToken } from "@/lib";
import Link from "next/link";
import { Button } from "@/components/ui/button";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PageHeader } from "../../admin/_components/PageHeader";

const getCustomerOrders = async () => {
  const accessToken = await getAccessToken();

  const response = await backendAPI.get(`/order`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (response.status !== 200) {
    throw new Error(
      response.data.errors.map((error: any) => error.message).join(", ")
    );
  }

  return response.data;
};
export default async function Page() {
  return (
    <>
      <PageHeader>My Orders</PageHeader>
      <OrdersTable />
    </>
  );
}

export async function OrdersTable() {
  const { orders, total } = await getCustomerOrders();
  if (orders.length === 0) {
    return (
      <div>
        <p>You have no orders yet.</p>
        <Link href='/'>
          <Button>Start Shopping</Button>
        </Link>
      </div>
    );
  }
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Items</TableHead>
          <TableHead>Total</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Address</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders.map((order: any, index: any) => (
          <TableRow key={index}>
            <TableCell>
              {order.items.map((item: any) => {
                return `| ${item.product.name} x ${item.quantity} | `;
              })}
            </TableCell>
            <TableCell>${order.totalPrice}</TableCell>
            <TableCell>{order.orderStatus}</TableCell>
            <TableCell>{order.shippingAddress}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
