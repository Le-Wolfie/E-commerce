"use client";

import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { registerUserAction } from "./actions";

const registerFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(3, "Password must be at least 3 characters long"),
});

export type registerFormValues = z.infer<typeof registerFormSchema>;

export default function RegisterForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<registerFormValues>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (values: registerFormValues) => {
    const result = await registerUserAction(values);

    if (!result.success) {
      return toast.error(result.error?.message);
    }

    toast.success("You have successfully registered!");

    router.push("/");
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='flex flex-col gap-4 items-center'
    >
      <div className='flex flex-col gap-4'>
        <div className='flex flex-col gap-2'>
          <label>Email</label>
          <input {...register("email")} type='email' />
          {errors.email && (
            <span className='text-red-500'>{errors.email.message}</span>
          )}
        </div>
        <div className='flex flex-col gap-2'>
          <label>Password</label>
          <input {...register("password")} type='password' />
          {errors.password && (
            <span className='text-red-500'>{errors.password.message}</span>
          )}
        </div>
      </div>
      <button className='btn-primary' type='submit' disabled={isSubmitting}>
        {isSubmitting ? "Registering..." : "Register"}
      </button>
    </form>
  );
}
