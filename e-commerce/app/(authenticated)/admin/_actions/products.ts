"use server";

import { revalidatePath } from "next/cache";
import { backendAPI } from "@/api";
import { AddProductFormValues } from "../products/_components/AddProductForm";
import { getAccessToken } from "@/lib";

export const addProductAction = async (data: AddProductFormValues) => {
  const accessToken = await getAccessToken();
  const requestBody = {
    ...data,
  };

  const response = await backendAPI.post(`/product`, requestBody, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  console.log(response.data);

  if (response.status !== 201) {
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
