"use server";

import { revalidatePath } from "next/cache";
import { registerFormValues } from "./RegisterForm";
import { authAPI } from "@/api";

export const registerUserAction = async (data: registerFormValues) => {
  const requestBody = {
    ...data,
  };

  const response = await authAPI.post(`/customer`, requestBody);

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
