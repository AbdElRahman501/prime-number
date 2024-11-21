import CredentialsProvider from "next-auth/providers/credentials";
import type { AuthOptions } from "next-auth";
import { Credentials } from "@/types";
import { loginUser } from "@/lib/actions/user.actions";

export const options: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "email",
          type: "email",
          placeholder: "Enter your email",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Enter your password",
        },
      },
      async authorize(credentials) {
        const { email, password } = credentials as Credentials;
        const user = await loginUser(email, password);
        if (!user) return null;
        return {
          id: user._id,
          name: user.name,
          image: user.image,
          email: user.email,
          role: user.isAdmin ? "admin" : "user",
        };
      },
    }),
  ],
  session: {
    strategy: "jwt", // Use JWT for sessions
    maxAge: 7 * 24 * 60 * 60, // Session lifespan in seconds (7 days)
  },
  jwt: {
    maxAge: 7 * 24 * 60 * 60, // JWT expiration time in seconds (7 days)
    secret: process.env.NEXTAUTH_SECRET, // Ensure you have a JWT secret defined
  },
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      const now = Math.floor(Date.now() / 1000); // Current time in seconds

      // If the user logs in, we add extra data to the token and set the expiration
      if (user) {
        token.role = user.role;
        // Set the token expiration time in the `exp` claim (JWT standard)
        token.exp = now + 7 * 24 * 60 * 60; // Token expires in 7 days
      }

      if (trigger === "update") {
        token.name = session.name;
        token.picture = session.image;
        token.email = session.email;
      }

      // Ensure that the token is invalidated if it's expired
      if (typeof token.exp === "number" && now > token.exp) {
        return {}; // Expired token, return an empty token
      }

      return token;
    },
    async session({ session, token }) {
      // Attach user role to the session object
      if (session?.user) {
        session.user.role = token.role as string;
        // Optionally set session expiration time
        const now = Date.now();
        const maxAge = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds
        session.expires = new Date(now + maxAge).toISOString(); // Set session expiry in the session object
      }

      return session;
    },
  },
};
