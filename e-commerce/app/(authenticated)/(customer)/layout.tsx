import { Navbar, NavLink } from "@/components/Navbar";
import SignOutButton from "@/components/SignOutButton";

export const dynamic = "force-dynamic";

export default async function Layout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  return (
    <>
      <Navbar>
        <NavLink href={`/`}>Home</NavLink>
        <NavLink href={`/products`}>Products</NavLink>
        <NavLink href={`/orders`}>My Orders</NavLink>
        <SignOutButton />
      </Navbar>
      <div className='container my-6'>{children}</div>
    </>
  );
}
