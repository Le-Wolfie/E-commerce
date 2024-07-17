import { tokenPayload } from "@/lib";
import { getServerSession } from "next-auth";

export default async function Page() {
  const session = await getServerSession();
  const lol = tokenPayload(session);
  console.log(lol);

  return (
    <div>
      <h1>Page</h1>
    </div>
  );
}
