// next-auth.d.ts
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      name: string;
      image?: string;
      role: string;
    };
    expires: ISODateString;
    error?: string;
  }

  interface User {
    id: string;
    email: string;
    name: string;
    image?: string;
    role: string;
  }
}
