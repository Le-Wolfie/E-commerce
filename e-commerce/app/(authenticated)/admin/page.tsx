import { backendAPI } from "@/api";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getAccessToken } from "@/lib";

type DashboardCardProps = {
  title: string;
  description: string;
  body: string;
};

const getTotalUsers = async () => {
  const accessToken = await getAccessToken();

  const response = await backendAPI.get(`/stats/total-users`, {
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

export default async function Dashboard() {
  const [{ totalUsers }, { orders, total }] = await Promise.all([
    getTotalUsers(),
    getOrdersData(),
  ]);

  return (
    <div className='flex flex-col gap-4'>
      <DashBoardCard
        title='Total Users'
        description='Total number of users'
        body={`${totalUsers} users are registered in the system`}
      />
      <DashBoardCard
        title='Total Orders'
        description='Total number of orders'
        body={`${total} orders have been placed`}
      />

      <Card>
        <CardHeader>
          <CardTitle>Orders Data</CardTitle>
          <CardDescription>Orders data for the last 7 days</CardDescription>
        </CardHeader>
        <CardContent>
          {orders.map((order: any, index: any) => (
            <div key={index} className='flex justify-between py-4'>
              <p>{`Ordered by ${order.user.email}`}</p>
              <p>{`Items : ${order.items.map((item: any, index: any) => {
                return `${item.product.name} x ${item.quantity}${
                  index === order.items.length - 1 ? "" : " "
                }`;
              })}`}</p>
              <p>{`Shipped to ${order.shippingAddress}`}</p>
              <p>{`Payment Status: ${order.paymentStatus}`}</p>
              <p>{`Order Status: ${order.orderStatus}`}</p>
              <p>{`Total Price: ${order.totalPrice}`}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

function DashBoardCard({ title, description, body }: DashboardCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>{body}</p>
      </CardContent>
    </Card>
  );
}
