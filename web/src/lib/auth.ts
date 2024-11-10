// -- ./src/lib/auth.ts
import Credentials from "next-auth/providers/credentials";

import {Client as ClientType, } from "src/app/api//data";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";

import avatar3 from "src/public/images/avatar/avatar-3.jpg";


export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID as string,
      clientSecret: process.env.AUTH_GOOGLE_SECRET as string,
    }),
    GithubProvider({
      clientId: process.env.AUTH_GITHUB_ID as string,
      clientSecret: process.env.AUTH_GITHUB_SECRET as string,
    }),
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
        async authorize(credentials) {
             const {email, password} = credentials as {
          email: string,
          password: string,
        };

        const foundClient = .find((u) => u.email === email)

        if (!foundClient) {
          return null;
        }

        const valid = password === foundClient.password

        if (!valid) {

          return null;
        }

        if (foundClient) {
          return foundClient as any

        }
        return null;
      }

    }),
  ],
  secret: process.env.AUTH_SECRET,

  session: {
    strategy: "jwt",
  },
  debug: process.env.NODE_ENV !== "production",
};
