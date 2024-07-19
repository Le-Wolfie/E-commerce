"use server";
import { getAccessToken } from "@/lib";
import { backendAPI } from "@/api";
import { revalidatePath } from "next/cache";
import { AddToCartFormValues } from "../cart/_components/AddToCartForm";
import { RemoveFromCartFormValues } from "../cart/_components/RemoveFromCartForm";
import { updateItemQuantityFormValues } from "../cart/_components/UpdateItemQuantityForm";

export const addToCartAction = async (data: AddToCartFormValues) => {
  const accessToken = await getAccessToken();
  const requestBody = {
    ...data,
  };

  console.log(requestBody);

  const response = await backendAPI.post(`/cart/add`, requestBody, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

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

export const removeFromCartAction = async (data: RemoveFromCartFormValues) => {
  const accessToken = await getAccessToken();

  const response = await backendAPI.patch(
    `/cart/remove/${data.itemId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (response.status !== 200) {
    console.log(response.data);

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

export const updateItemQuantityAction = async (
  data: updateItemQuantityFormValues
) => {
  const accessToken = await getAccessToken();

  const response = await backendAPI.patch(
    `/cart/${data.itemId}`,
    {
      quantity: data.quantity,
    },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (response.status !== 200) {
    console.log(response.data);

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
