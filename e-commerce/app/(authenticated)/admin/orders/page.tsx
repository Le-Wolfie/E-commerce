import { getAccessToken } from "@/lib";
import { PageHeader } from "../_components/PageHeader";
import { backendAPI } from "@/api";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical } from "lucide-react";
import Link from "next/link";

const getOrdersData = async () => {
  const accessToken = await getAccessToken();

  const response = await backendAPI.get(`/stats/orders-data`, {
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

export default async function AdminOrders() {
  return (
    <>
      <div className='flex justify-between items-center gap-4'>
        <PageHeader>All Orders</PageHeader>
      </div>
      <OrdersTable />
    </>
  );
}

async function OrdersTable() {
  const { orders, total } = await getOrdersData();
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>User</TableHead>
          <TableHead>Items</TableHead>
          <TableHead>Total</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Address</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders.map((order: any, index: any) => (
          <TableRow key={index}>
            <TableCell>{order.user.email}</TableCell>
            <TableCell>
              {order.items.map((item: any) => {
                return `| ${item.product.name} x ${item.quantity} | `;
              })}
            </TableCell>
            <TableCell>{order.totalPrice}</TableCell>
            <TableCell>{order.orderStatus}</TableCell>
            <TableCell>{order.shippingAddress}</TableCell>
            <TableCell>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <MoreVertical />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem asChild>
                    <Link href={`/admin/orders/edit/${order._id}`}>
                      Update Status
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
