"use client";
import { Button } from "@/components/ui/button";
import { UserExtend } from "@/data/user";
import { signOut } from "next-auth/react";
import React from "react";

interface ButtonSignOutProps {
  currentUser?: UserExtend | null;
}

export const ButtonSignOut: React.FC<ButtonSignOutProps> = ({
  currentUser,
}) => {
  return (
    <span
      className="font-bold text-md block hover:bg-transparent hover:text-primary transition-colors duration-300 cursor-pointer"
      onClick={() => signOut()}
    >
      Cerrar la sessión de {currentUser?.username}
    </span>
  );
};
