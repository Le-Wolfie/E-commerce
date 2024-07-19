import { ensureAuthenticated } from "@/lib";

export default async function Layout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  await ensureAuthenticated();
  return (
    <>
      <div>{children}</div>
    </>
  );
}
