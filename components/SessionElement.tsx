"use client";
import { useSession } from "next-auth/react";

export default function SessionElement({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { data: session } = useSession();
  if (session?.user?.name === "Admin") return children;
}
