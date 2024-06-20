import GitHub from "next-auth/providers/github";
import type { NextAuthConfig } from "next-auth";
import google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";

import bcrypt from "bcryptjs";

import { LoginSchema } from "@/schemas";

import { getUserByEmail } from "./data/user";

export default {
  providers: [
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
    }),
    google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
      profile(profile) {
        console.log({
          profile,
        });

        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
          emailVerified: profile.email_verified,
          username: profile.preferred_username
            ? `@${profile.preferred_username}`
            : `@${profile.name}-${profile.sub.slice(0, 4)}`,
        };
      },
    }),
    Credentials({
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials);

        if (validatedFields.success) {
          const { email, password } = validatedFields.data;

          const user = await getUserByEmail(email);

          if (!user || !user.hashedPassword) {
            return null;
          }

          const isValid = await bcrypt.compare(password, user.hashedPassword);

          if (isValid) {
            return user;
          }
        }

        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
