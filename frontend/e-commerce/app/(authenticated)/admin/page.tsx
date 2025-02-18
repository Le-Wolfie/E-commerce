import { backendAPI } from "@/api";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getAccessToken } from "@/lib";
import { getOrdersData, OrdersTable } from "./orders/page";
import { PageHeader } from "./_components/PageHeader";

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

export default async function Dashboard() {
  const [{ totalUsers }, { orders, total }] = await Promise.all([
    getTotalUsers(),
    getOrdersData(),
  ]);

  return (
    <>
      <div className='flex justify-between items-center gap-4'>
        <PageHeader>Dashboard</PageHeader>
      </div>
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
            <OrdersTable />
          </CardContent>
        </Card>
      </div>
    </>
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
