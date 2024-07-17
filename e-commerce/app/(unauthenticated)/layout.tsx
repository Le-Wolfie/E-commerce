import { ensureUnauthenticated } from "@/lib";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  await ensureUnauthenticated();
  return <>{children}</>;
}
