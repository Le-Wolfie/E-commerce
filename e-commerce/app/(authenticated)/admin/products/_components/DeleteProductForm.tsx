"use client";

import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { ReloadIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { deleteProductAction } from "../../_actions/products";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { AlertDialogTitle } from "@radix-ui/react-alert-dialog";

const deleteProductFormSchema = z.object({
  code: z.string(),
});

export type DeleteProductFormValues = z.infer<typeof deleteProductFormSchema>;

export default function DeleteProductForm({ code }: { code: string }) {
  const router = useRouter();
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<DeleteProductFormValues>({
    resolver: zodResolver(deleteProductFormSchema),
    defaultValues: {
      code: code,
    },
  });

  const onSubmit = async (values: DeleteProductFormValues) => {
    const result = await deleteProductAction(values);

    if (!result.success) {
      return toast.error(result.error?.message);
    }

    toast.success("Product has been deleted");

    router.push("/admin/products");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* <AlertDialog>
        <AlertDialogTrigger asChild>
          <button type='button'>
            <p className='text-destructive'>Delete</p>
          </button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to delete this product?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>Yes</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog> */}
      <button type='submit' disabled={isSubmitting}>
        {isSubmitting ? (
          <ReloadIcon />
        ) : (
          <p className='text-destructive'>Delete</p>
        )}
      </button>
    </form>
  );
}
