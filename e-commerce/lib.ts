import { getServerSession, Session } from "next-auth";
import { redirect } from "next/navigation";
import jwt from "jsonwebtoken";

export function tokenPayload(session: Session | null) {
  return {
    role: session?.user?.name,
    userId: session?.user?.email,
  };
}

export async function getAccessToken() {
  const session = await getServerSession();
  const payload = tokenPayload(session);
  const accessToken = jwt.sign(payload, process.env.JWT_SECRET as string);
  return accessToken;
}

export async function ensureAuthenticated() {
  const session = await getServerSession();
  if (!session) redirect("/auth");
  return session;
}

export async function ensureUnauthenticated() {
  const session = await getServerSession();
  if (session) redirect("/");
  return session;
}
