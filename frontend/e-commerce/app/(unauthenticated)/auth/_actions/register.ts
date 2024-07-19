"use server";

import { revalidatePath } from "next/cache";
import { registerFormValues } from "../_components/RegisterForm";
import { backendAPI } from "@/api";

export const registerUserAction = async (data: registerFormValues) => {
  const requestBody = {
    ...data,
  };

  const response = await backendAPI.post(`/customer`, requestBody);


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
