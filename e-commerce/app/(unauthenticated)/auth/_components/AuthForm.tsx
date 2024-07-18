"use client";

import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { ReloadIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const authFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, "Enter a password"),
});

type AuthFormValues = z.infer<typeof authFormSchema>;

export default function AuthForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
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
          <Label htmlFor='email'>Email</Label>
          <Input
            {...register("email")}
            type='email'
            placeholder='Your Email Address'
          />
          {errors.email && (
            <span className='text-red-500'>{errors.email.message}</span>
          )}
        </div>
        <div className='flex flex-col gap-2'>
          <Label htmlFor='password'>Password</Label>
          <Input
            {...register("password")}
            type='password'
            placeholder='Your Password'
          />
          {errors.password && (
            <span className='text-red-500'>{errors.password.message}</span>
          )}
        </div>
      </div>
      <Button variant='outline' type='submit' disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <ReloadIcon className='mr-2 h-4 w-4 animate-spin' />
            {"Signing In..."}
          </>
        ) : (
          "Sign In"
        )}
      </Button>
    </form>
  );
}
