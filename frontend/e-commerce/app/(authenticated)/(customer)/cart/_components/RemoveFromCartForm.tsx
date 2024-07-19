"use client";

import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { ReloadIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { addToCartAction, removeFromCartAction } from "../../_actions/cart";

const removeFromCartFormSchema = z.object({
  itemId: z.string().min(1, "ItemId is required"),
});

export type RemoveFromCartFormValues = z.infer<typeof removeFromCartFormSchema>;

export default function RemoveFromCartForm({ name, itemId }: any) {
  const router = useRouter();
  const {
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<RemoveFromCartFormValues>({
    resolver: zodResolver(removeFromCartFormSchema),
    defaultValues: {
      itemId,
    },
  });

  const onSubmit = async (values: RemoveFromCartFormValues) => {
    const result = await removeFromCartAction(values);

    if (!result.success) {
      return toast.error(result.error?.message);
    }

    toast.success(`Removed ${name} from cart`);

    router.refresh();
  };
  const onInvalid = (errors: any) => console.error(errors);
  return (
    <form onSubmit={handleSubmit(onSubmit, onInvalid)}>
      <Button type='submit' variant={"destructive"} disabled={isSubmitting}>
        {isSubmitting ? (
          <ReloadIcon className='mr-2 h-4 w-4 animate-spin' />
        ) : (
          "Remove From Cart"
        )}
      </Button>
    </form>
  );
}
