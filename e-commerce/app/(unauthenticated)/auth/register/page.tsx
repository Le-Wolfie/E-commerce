import Link from "next/link";
import RegisterForm from "../_components/RegisterForm";
import Image from "next/image";

export default function Page() {
  return (
    <div className='flex flex-row items-center justify-center w-full h-screen gap-32 p-8 bg-gray-100'>
      <div className='w-full max-w-md p-8 bg-white shadow-lg rounded-lg'>
        <RegisterForm />
        <div className='mt-4 text-center'>
          <span>Already have an account? </span>
          <Link className='text-blue-500 hover:underline' href='/auth'>
            Sign in
          </Link>
        </div>
      </div>
      <div className='hidden md:block w-[1px] h-2/3 bg-slate-300 rounded-full' />
      <div className='hidden md:flex flex-col gap-8 items-center'>
        <div className='flex flex-row gap-16'>
          <Image src='/shop.jpg' alt='Shop Logo' width={400} height={200} />
        </div>
        <div className='flex flex-col gap-4 justify-center items-center'>
          <h1 className='text-4xl font-bold text-gray-800'>
            E-Commerce Website
          </h1>
        </div>
      </div>
    </div>
  );
}
