import { Navbar, NavLink } from "@/components/Navbar";
import SignOutButton from "@/components/SignOutButton";
import { tokenPayload } from "@/lib";
import { Role } from "@/models/checkRole.middleware";
import { getServerSession } from "next-auth";

export const dynamic = "force-dynamic";

export default async function Layout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  const session = await getServerSession();
  const role = tokenPayload(session).role;
  if (role !== Role.ADMIN) {
    return <div>Unauthorized</div>;
  }
  return (
    <>
      <Navbar>
        <NavLink href={`/admin`}>Dashboard</NavLink>
        <NavLink href={`/admin/products`}>Products</NavLink>
        <NavLink href={`/admin/orders`}>Orders</NavLink>
        <SignOutButton />
      </Navbar>
      <div className='container my-6'>{children}</div>
    </>
  );
}
