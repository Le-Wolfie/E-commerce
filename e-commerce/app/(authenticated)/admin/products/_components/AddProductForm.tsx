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
import { addProductAction } from "../../_actions/products";
import { Textarea } from "@/components/ui/textarea";

const addProductFormSchema = z.object({
  code: z.string().min(1, "Code is required"),
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  price: z.number().min(0, "Price is required"),
  stock: z.number().min(0, "Stock is required"),
  category: z.string().min(1, "Category is required"),
});

export type AddProductFormValues = z.infer<typeof addProductFormSchema>;

export default function AddProductForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<AddProductFormValues>({
    resolver: zodResolver(addProductFormSchema),
    defaultValues: {
      code: "",
      name: "",
      description: "",
      price: 0,
      stock: 0,
      category: "",
    },
  });

  const onSubmit = async (values: AddProductFormValues) => {
    const result = await addProductAction(values);

    if (!result.success) {
      return toast.error(result.error?.message);
    }

    toast.success("Product added successfully!");

    router.push("/admin/products");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='flex flex-col gap-4'>
        <div className='flex flex-col gap-2'>
          <Label htmlFor='code'>Code</Label>
          <Input
            type='text'
            id='code'
            placeholder='Enter a code'
            required
            {...register("code")}
          />
          {errors.code && (
            <span className='text-red-500'>{errors.code.message}</span>
          )}
        </div>
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
          {isSubmitting ? <ReloadIcon /> : "Add Product"}
        </Button>
      </div>
    </form>
  );
}
