"use server";
import { getAccessToken } from "@/lib";
import { EditOrderFormValues } from "../orders/_components/EditOrderForm";
import { backendAPI } from "@/api";
import { revalidatePath } from "next/cache";

export const updateOrderStatusAction = async (data: EditOrderFormValues) => {
  const accessToken = await getAccessToken();
  const requestBody = {
    ...data,
    orderId: undefined,
  };

  const response = await backendAPI.patch(
    `/checkout/${data.orderId}`,
    requestBody,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (response.status !== 200) {
    return {
      success: false,
      error: {
        message: response.data.errors
          .map((error: any) => error.message)
          .join(", "),
      },
    };
  }

  revalidatePath("/");

  return { success: true };
};
