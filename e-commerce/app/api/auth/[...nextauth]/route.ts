import dbConnect from "@/database";

import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { UserModel } from "@/models/user.model";

const handler = NextAuth({
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (
          credentials?.password === undefined ||
          credentials?.email === undefined
        ) {
          return null;
        }

        await dbConnect();

        const user = await UserModel.findOne({
          email: credentials.email,
        });

        if (!user) return null;

        const isPasswordMatch = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isPasswordMatch) return null;

        return {
          id: user._id,
          email: user.email,
          name: user.role,
        };
      },
    }),
  ],
});

export { handler as GET, handler as POST };
