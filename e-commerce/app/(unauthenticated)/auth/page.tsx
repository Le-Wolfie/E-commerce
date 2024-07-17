import AuthForm from "./AuthForm";
import Link from "next/link";

export default function Page() {
  return (
    <div className='flex flex-row items-center justify-center w-full h-screen gap-32 p-8 bg-gray-100'>
      <div className='w-full max-w-md p-8 bg-white shadow-lg rounded-lg'>
        <AuthForm />
        <div className='mt-4 text-center'>
          <span>Don't have an account? </span>
          <Link className='text-blue-500 hover:underline' href='/auth/register'>
            Create one!
          </Link>
        </div>
      </div>
      <div className='hidden md:block w-[1px] h-2/3 bg-slate-300 rounded-full' />
      <div className='hidden md:flex flex-col gap-8 items-center'>
        <div className='flex flex-col gap-4 justify-center items-center'>
          <h1 className='text-4xl font-bold text-gray-800'>Welcome to</h1>
          <h1 className='text-4xl font-bold text-gray-800'>our store</h1>
        </div>
      </div>
    </div>
  );
}
