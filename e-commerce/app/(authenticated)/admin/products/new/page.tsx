import { PageHeader } from "../../_components/PageHeader";
import AddProductForm from "../_components/AddProductForm";

export default function AddProduct() {
  return (
    <>
      <PageHeader>Add Product</PageHeader>
      <div className='flex justify-center'>
        <AddProductForm />
      </div>
    </>
  );
}
