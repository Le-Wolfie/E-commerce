"use client";

import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { registerUserAction } from "./actions";
import { Button } from "@/components/ui/button";
import { ReloadIcon } from "@radix-ui/react-icons";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

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
            {"Registering..."}
          </>
        ) : (
          "Register"
        )}
      </Button>
    </form>
  );
}
