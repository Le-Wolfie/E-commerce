"use client";

import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const authFormSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

type AuthFormValues = z.infer<typeof authFormSchema>;

export default function AuthForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<AuthFormValues>({
    resolver: zodResolver(authFormSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (values: AuthFormValues) => {
    const result = await signIn("credentials", {
      redirect: false,
      email: values.email,
      password: values.password,
    });

    if (result?.ok) {
      toast.success(
        "You have successfully signed in. Redirecting you to the homepage."
      );
      router.push("/");
    } else {
      toast.error(
        "An error occurred while signing in. Please check your credentials."
      );
    }
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
        </div>
        <div className='flex flex-col gap-2'>
          <label>Password</label>
          <input {...register("password")} type='password' />
        </div>
      </div>
      <button className='btn' type='submit' disabled={isSubmitting}>
        {isSubmitting ? "Signing in..." : "Sign in"}
      </button>
    </form>
  );
}
