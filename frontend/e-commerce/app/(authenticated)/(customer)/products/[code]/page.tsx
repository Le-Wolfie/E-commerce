import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getProduct } from "@/app/(authenticated)/admin/products/edit/[code]/page";
import AddToCartForm from "../../cart/_components/AddToCartForm";

export default async function Products({
  params,
}: {
  params: { code: string };
}) {
  const { product } = await getProduct(params.code);
  return (
    <>
      <div className='flex flex-col gap-4'>
        <ProductCardDetailed key={product.id} product={product} />
      </div>
    </>
  );
}

function ProductCardDetailed({ product }: { product: any }) {
  return (
    <Card>
      <CardHeader>
        <div className='flex justify-center'>
          <CardTitle>{product.name}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className='flex flex-col justify-center items-center gap-4'>
          <img
            src='shop.jpg'
            alt={product.name}
            className=' w-48 h-48 object-cover rounded-sm'
          />
          <CardDescription>{product.description}</CardDescription>
          <CardDescription>Price: ${product.price}</CardDescription>
          <CardDescription>In Stock: {product.stock}</CardDescription>
          <AddToCartForm
            productCode={product.code}
            price={product.price}
            name={product.name}
          />
        </div>
      </CardContent>
    </Card>
  );
}
