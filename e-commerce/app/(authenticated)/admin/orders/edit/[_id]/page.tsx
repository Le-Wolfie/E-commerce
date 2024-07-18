import { backendAPI } from "@/api";
import { PageHeader } from "../../../_components/PageHeader";
import EditOrderForm from "../../_components/EditOrderForm";

const getOrder = async (id: string) => {
  const response = await backendAPI.get(`/checkout/${id}`);

  if (response.status !== 200) {
    throw new Error(
      response.data.errors.map((error: any) => error.message).join(", ")
    );
  }

  return response.data;
};

export default async function EditProduct({
  params,
}: {
  params: { _id: string };
}) {
  const { order } = await getOrder(params._id);

  return (
    <>
      <PageHeader>Update Order Status</PageHeader>
      <div className='flex justify-center'>
        <EditOrderForm order={order} />
      </div>
    </>
  );
}
