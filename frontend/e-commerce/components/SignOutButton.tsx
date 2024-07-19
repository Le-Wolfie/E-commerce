"use client";

import { signOut } from "next-auth/react";

export default function SignOutButton() {
  return (
    <div className='flex ml-6'>
      <button
        className='text-red-500 p-2 cursor-pointer hover:bg-slate-100 transition-colors duration-300 text-start'
        onClick={() => signOut({ callbackUrl: "/" })}
      >
        Log Out
      </button>
    </div>
  );
}
