import AuthForm from "./AuthForm";

export default async function Page() {
  return (
    <div className='flex flex-row items-center justify-center w-full h-full gap-32'>
      <AuthForm />
      <div className='w-[1px] h-1/2 bg-slate-300 rounded-full' />
      <div className='flex flex-col gap-8 items-center'>
        <div className='flex flex-col gap-4 justify-center items-center'>
          <h1>Welcome to </h1>
          <h1>our store</h1>
        </div>
      </div>
    </div>
  );
}
