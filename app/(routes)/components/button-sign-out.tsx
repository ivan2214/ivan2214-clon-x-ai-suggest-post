"use client"
import {signOut} from "next-auth/react"
import React from "react"

import {type UserExtend} from "@/data/user"

interface ButtonSignOutProps {
  currentUser?: UserExtend | null
}

export const ButtonSignOut: React.FC<ButtonSignOutProps> = ({currentUser}) => {
  return (
    <span
      className="text-md block cursor-pointer font-bold transition-colors duration-300 hover:bg-transparent hover:text-primary"
      onClick={() => signOut()}
    >
      Cerrar la sessión de {currentUser?.username}
    </span>
  )
}
