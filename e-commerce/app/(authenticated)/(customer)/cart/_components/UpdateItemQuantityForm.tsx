"use client";

import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { ReloadIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { updateItemQuantityAction } from "../../_actions/cart";

const updateItemQuantityFormSchema = z.object({
  itemId: z.string().min(1, "ItemId is required"),
  quantity: z.number().min(1, "Quantity is required"),
});

export type updateItemQuantityFormValues = z.infer<
  typeof updateItemQuantityFormSchema
>;

export default function UpdateItemQuantityForm({
  name,
  itemId,
  quantity: initialQuantity,
}: any) {
  const router = useRouter();
  const [quantity, setQuantity] = useState(initialQuantity);
  const {
    handleSubmit,
    formState: { isSubmitting, errors },
    setValue,
  } = useForm<updateItemQuantityFormValues>({
    resolver: zodResolver(updateItemQuantityFormSchema),
    defaultValues: {
      itemId,
      quantity: initialQuantity,
    },
  });

  const onSubmit = async (values: updateItemQuantityFormValues) => {
    const result = await updateItemQuantityAction(values);

    if (!result.success) {
      return toast.error(result.error?.message);
    }

    toast.success(`Quantity for ${name} updated!`);
    router.refresh();
  };

  const onInvalid = (errors: any) => console.error(errors);

  const incrementQuantity = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    setValue("quantity", newQuantity);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      setValue("quantity", newQuantity);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit, onInvalid)}>
      <div className='flex items-center gap-2'>
        <button
          type='button'
          onClick={decrementQuantity}
          className='bg-gray-200 px-2 py-1 rounded'
        >
          -
        </button>
        <input
          type='number'
          value={quantity}
          onChange={(e) => {
            const newQuantity = parseInt(e.target.value, 10);
            setQuantity(newQuantity);
            setValue("quantity", newQuantity);
          }}
          className='border px-2 py-1 rounded'
        />
        <button
          type='button'
          onClick={incrementQuantity}
          className='bg-gray-200 px-2 py-1 rounded'
        >
          +
        </button>
      </div>
      {errors.quantity && (
        <p className='text-red-500 text-sm'>{errors.quantity.message}</p>
      )}
      <div className='flex justify-center'>
        <Button type='submit' disabled={isSubmitting} className='mt-4'>
          {isSubmitting ? (
            <ReloadIcon className='mr-2 h-4 w-4 animate-spin' />
          ) : (
            "Update"
          )}
        </Button>
      </div>
    </form>
  );
}
