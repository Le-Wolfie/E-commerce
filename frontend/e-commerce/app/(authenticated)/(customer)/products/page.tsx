import { backendAPI } from "@/api";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import AddToCartForm from "../cart/_components/AddToCartForm";

const getProducts = async () => {
  const response = await backendAPI.get(`/product`);

  if (response.status !== 200) {
    throw new Error(
      response.data.errors.map((error: any) => error.message).join(", ")
    );
  }

  return response.data;
};

export default async function Products() {
  const { products, total } = await getProducts();
  return (
    <>
      <div className='flex flex-col gap-4'>
        <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-5'>
          {products.map((product: any) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </>
  );
}

function ProductGrid({ products, title }: { products: any[]; title: string }) {
  return (
    <Card>
      <CardHeader>
        <div className='flex gap-4 items-center'>
          <CardTitle>{title}</CardTitle>
          <Button variant={"outline"} asChild>
            <Link className='flex items-center' href='/products'>
              <span>View All</span>
              <ArrowRight size={16} className='ml-2' />
            </Link>
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function ProductCard({ product }: { product: any }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{product.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className='flex flex-col gap-4'>
          <img
            src={"random.jpg"}
            alt={product.name}
            className='w-full h-48 object-cover rounded-sm'
          />
          <CardDescription>{product.description}</CardDescription>
          <CardDescription>Price: ${product.price}</CardDescription>
          <Button variant={"outline"} asChild>
            <Link href={`/products/${product.code}`}>View Product</Link>
          </Button>
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
