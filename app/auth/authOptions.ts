import { hashPassword } from "@/components/utils";
import { getUserByEmail } from "@/data-access/user";
import { db } from "@/drizzle";
import { validateUserSignin } from "@/validation";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { compare } from "bcryptjs";
import { NextAuthOptions } from "next-auth";
import type { Adapter } from "next-auth/adapters";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

const authOptions: NextAuthOptions = {
  adapter: DrizzleAdapter(db) as Adapter,
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "Enter your email address",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Enter your password",
        },
      },
      async authorize(credentials) {
        const validation =
          validateUserSignin.safeParse(credentials);

        if (!validation.success) return null;

        const { email, password } = credentials!;

        const user = await getUserByEmail(email);
        if (!user) return null;

        const passwordMatched = await compare(
          password,
          user.password!
        );

        if (!passwordMatched) return null;

        user.password = "";
        return user;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    session: ({ session, token }) => ({
      ...session,
      user: {
        ...session.user,
        id: token.sub,
      },
    }),
  },
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/user/signin",
  },
};

export default authOptions;
