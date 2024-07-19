"use client";

import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { ReloadIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { addToCartAction } from "../../_actions/cart";

const addToCartFormSchema = z.object({
  productCode: z.string().min(1, "Code is required"),
  price: z.number().min(0, "Price is required"),
  quantity: z.number().min(0, "Stock is required"),
});

export type AddToCartFormValues = z.infer<typeof addToCartFormSchema>;

export default function AddToCartForm({ name, productCode, price }: any) {
  const router = useRouter();
  const {
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<AddToCartFormValues>({
    resolver: zodResolver(addToCartFormSchema),
    defaultValues: {
      productCode: productCode,
      price: price,
      quantity: 1,
    },
  });

  const onSubmit = async (values: AddToCartFormValues) => {
    const result = await addToCartAction(values);

    if (!result.success) {
      return toast.error(result.error?.message);
    }

    toast.success(`Added ${name} to cart!`);

    router.refresh();
  };
  const onInvalid = (errors: any) => console.error(errors);
  return (
    <form onSubmit={handleSubmit(onSubmit, onInvalid)}>
      <div className='flex justify-center'>
        <Button type='submit' variant={"default"} disabled={isSubmitting}>
          {isSubmitting ? (
            <ReloadIcon className='mr-2 h-4 w-4 animate-spin' />
          ) : (
            "Add To Cart"
          )}
        </Button>
      </div>
    </form>
  );
}
