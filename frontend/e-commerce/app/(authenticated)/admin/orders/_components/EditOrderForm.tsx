"use client";

import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { ReloadIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { updateOrderStatusAction } from "../../_actions/orders";

const editOrderFormSchema = z.object({
  orderStatus: z.enum([
    "PENDING",
    "PROCESSING",
    "SHIPPED",
    "DELIVERED",
    "CANCELLED",
  ]),
  orderId: z.string(),
});

export type EditOrderFormValues = z.infer<typeof editOrderFormSchema>;

export default function EditOrderForm({ order }: { order: any }) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { isSubmitting, errors },
  } = useForm<EditOrderFormValues>({
    resolver: zodResolver(editOrderFormSchema),
    defaultValues: {
      orderStatus: order.orderStatus,
      orderId: order._id,
    },
  });

  const orderStatus = watch("orderStatus");

  useEffect(() => {
    register("orderStatus");
  }, [register]);

  const handleStatusChange = (value: string) => {
    setValue("orderStatus", value as EditOrderFormValues["orderStatus"]);
  };

  const onSubmit = async (values: EditOrderFormValues) => {
    const result = await updateOrderStatusAction(values);

    if (!result.success) {
      return toast.error(result.error?.message);
    }

    toast.success("Order status updated successfully!");

    router.push("/admin/orders");
  };

  const onInvalid = (errors: any) => console.error(errors);

  return (
    <form onSubmit={handleSubmit(onSubmit, onInvalid)}>
      <div className='flex flex-col gap-4 mb-4'>
        <Label htmlFor='orderStatus'>Order Status</Label>
        <Select value={orderStatus} onValueChange={handleStatusChange}>
          <SelectTrigger>
            <SelectValue placeholder={order.orderStatus} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='PENDING'>PENDING</SelectItem>
            <SelectItem value='PROCESSING'>PROCESSING</SelectItem>
            <SelectItem value='SHIPPED'>SHIPPED</SelectItem>
            <SelectItem value='DELIVERED'>DELIVERED</SelectItem>
            <SelectItem value='CANCELLED'>CANCELLED</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {errors.orderStatus && (
        <span className='text-red-500'>{errors.orderStatus.message}</span>
      )}

      <div className='flex justify-center'>
        <Button type='submit' variant={"default"} disabled={isSubmitting}>
          {isSubmitting ? (
            <ReloadIcon className='mr-2 h-4 w-4 animate-spin' />
          ) : (
            "Update Status"
          )}
        </Button>
      </div>
    </form>
  );
}
