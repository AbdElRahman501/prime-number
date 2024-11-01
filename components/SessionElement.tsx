"use client";
import { signOut, useSession } from "next-auth/react";
import { ButtonHTMLAttributes } from "react";

export default function SessionElement({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { data: session } = useSession();
  if (session?.user?.name === "Admin") return children;
}

export const SignOutButton: React.FC<
  ButtonHTMLAttributes<HTMLButtonElement> & { children?: React.ReactNode }
> = (props) => {
  const { onClick, ...rest } = props;

  const logOut = (e: React.MouseEvent<HTMLButtonElement>) => {
    signOut({ callbackUrl: "/" });
    onClick?.(e);
  };
  return (
    <button {...rest} onClick={logOut}>
      {props.children}
    </button>
  );
};
