"use client";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Button } from "@ui/button";
import { signIn } from "next-auth/react";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

export const Social = () => {
  const onCLick = (provider: "google" | "github") => {
    signIn(provider, {
      callbackUrl: DEFAULT_LOGIN_REDIRECT,
    });
  };
  return (
    <div className="flex w-full flex-col gap-y-4">
      <Button
        size="lg"
        className="w-full bg-white text-black flex items-center gap-x-2 text-sm font-normal"
        onClick={() => onCLick("google")}
      >
        <FcGoogle className="h-5 w-5" />
        <span>Registrarse con Google</span>
      </Button>
      <Button
        size="lg"
        className="w-full bg-white text-black flex items-center gap-x-2 text-sm font-normal"
        onClick={() => onCLick("github")}
      >
        <FaGithub className="h-5 w-5" />
        <span>Registrarse con Github</span>
      </Button>
    </div>
  );
};
