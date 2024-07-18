import { backendAPI } from "@/api";
import { PageHeader } from "../../../_components/PageHeader";
import EditProductForm from "../../_components/EditProductform";

const getProduct = async (code: string) => {
  const response = await backendAPI.get(`/product/${code}`);

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
  params: { code: string };
}) {
  const { product } = await getProduct(params.code);
  return (
    <>
      <PageHeader>Edit Product</PageHeader>
      <div className='flex justify-center'>
        <EditProductForm product={product} />
      </div>
    </>
  );
}
