"use client";

import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { ReloadIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { editProductAction } from "../../_actions/products";

const editProductFormSchema = z.object({
  code: z.string(),
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  price: z.number().min(0, "Price is required"),
  stock: z.number().min(0, "Stock is required"),
  category: z.string().min(1, "Category is required"),
});

export type EditProductFormValues = z.infer<typeof editProductFormSchema>;

export default function EditProductForm({
  product,
}: {
  product: EditProductFormValues;
}) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<EditProductFormValues>({
    resolver: zodResolver(editProductFormSchema),
    defaultValues: {
      code: product.code,
      name: product.name,
      description: product.description,
      price: product.price,
      stock: product.stock,
      category: product.category,
    },
  });

  const onSubmit = async (values: EditProductFormValues) => {
    const result = await editProductAction(values);

    if (!result.success) {
      return toast.error(result.error?.message);
    }

    toast.success("Product updated successfully!");

    router.push("/admin/products");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='flex flex-col gap-4'>
        <div className='flex flex-col gap-2'>
          <Label htmlFor='name'>Name</Label>
          <Input
            type='text'
            id='name'
            placeholder='Enter a name'
            required
            {...register("name")}
          />
          {errors.name && (
            <span className='text-red-500'>{errors.name.message}</span>
          )}
        </div>
        <div className='flex flex-col gap-2'>
          <Label htmlFor='description'>Description</Label>
          <Textarea
            id='description'
            placeholder='Enter a description'
            required
            {...register("description")}
          />
          {errors.description && (
            <span className='text-red-500'>{errors.description.message}</span>
          )}
        </div>
        <div className='flex flex-col gap-2'>
          <Label htmlFor='price'>Price</Label>
          <Input
            type='number'
            id='price'
            placeholder='Enter a price'
            required
            {...register("price", { valueAsNumber: true })}
          />
          {errors.price && (
            <span className='text-red-500'>{errors.price.message}</span>
          )}
        </div>
        <div className='flex flex-col gap-2'>
          <Label htmlFor='stock'>Stock</Label>
          <Input
            type='number'
            id='stock'
            placeholder='Enter a stock'
            required
            {...register("stock", { valueAsNumber: true })}
          />
          {errors.stock && (
            <span className='text-red-500'>{errors.stock.message}</span>
          )}
        </div>
        <div className='flex flex-col gap-2 mb-4'>
          <Label htmlFor='category'>Category</Label>
          <Input
            type='text'
            id='category'
            placeholder='Enter a category'
            required
            {...register("category")}
          />
          {errors.category && (
            <span className='text-red-500'>{errors.category.message}</span>
          )}
        </div>
      </div>
      <div className='flex justify-center'>
        <Button type='submit' variant={"default"} disabled={isSubmitting}>
          {isSubmitting ? (
            <ReloadIcon className='mr-2 h-4 w-4 animate-spin' />
          ) : (
            "Update Product"
          )}
        </Button>
      </div>
    </form>
  );
}
