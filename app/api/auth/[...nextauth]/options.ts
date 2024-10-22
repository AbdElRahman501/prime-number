import CredentialsProvider from "next-auth/providers/credentials";
import type { AuthOptions } from "next-auth";
import { Credentials, User } from "@/types";
import { scryptSync, randomBytes, timingSafeEqual } from "crypto";

const salt = randomBytes(16).toString("hex");
const hashedPassword = scryptSync("123456", salt, 64).toString("hex");

const users: User[] = [
  {
    id: "1",
    name: "Admin",
    email: "primenumber.eg@outlook.com",
    password: `${salt}:${hashedPassword}`,
  },
];

async function getUser(email: string): Promise<User | undefined> {
  try {
    const user = users.find((user) => user.email === email);
    return user;
  } catch (error) {
    console.error("Failed to fetch user:", error);
    throw new Error("Failed to fetch user.");
  }
}
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
        const user = await getUser(email);
        if (!user) return null;
        const [saltStored, hashedStored] = user.password.split(":");
        const hashedBuffer = scryptSync(password, saltStored, 64);
        const passwordsMatch = timingSafeEqual(
          Buffer.from(hashedStored, "hex"),
          hashedBuffer,
        );
        if (passwordsMatch) return user;
        return null;
      },
    }),
  ],
  callbacks: {
    async session({ session }) {
      return session;
    },
  },
};
