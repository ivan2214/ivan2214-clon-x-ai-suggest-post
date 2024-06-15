import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Button } from "@ui/button";
import { sidebarOptions } from "@/constants";
import React from "react";
import { TagIcon, TagIcons } from "@/components/icons/icons";
import { Account, User } from "@prisma/client";
import { UserExtend } from "@/data/user";
import { signOut } from "@/auth";
import { ButtonSignOut } from "./button-sign-out";

interface SidebarProps {
  currentUser?: UserExtend | null;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentUser }) => {
  return (
    <section className="h-full items-center flex justify-center fixed top-0 flex-col p-4">
      {/* logo */}

      <div className="w-full flex flex-col items-center justify-between h-full">
        <ul className="flex flex-col items-center h-full gap-y-1">
          <Link href="/">
            <img
              src="https://imgs.search.brave.com/zbvB3wCiEbb71hYQHjG-8saDi71vPc4yOVhzizCo_8k/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTIy/NjM4NjQzMC92ZWN0/b3IvdmVjdG9yLWRv/dWJsZS1saW5lLWFs/dGVybmF0aXZlLWxv/Z28tbGV0dGVyLXgu/anBnP3M9NjEyeDYx/MiZ3PTAmaz0yMCZj/PWx4UWZCZmNULVJi/UG9ZZVVRUmNsb01o/VG56RnlGQjJndEdZ/N2JVcUtzU2M9"
              alt="logo"
              className="h-12 w-12 object-cover rounded-full mx-auto"
            />
          </Link>
          {sidebarOptions.map((option) => {
            const isValid = option.name.toLowerCase() in TagIcons;

            return (
              <li key={option.name}>
                {option.href ? (
                  <Button
                    className="rounded-full w-fit h-fit"
                    variant="ghost"
                    role="link"
                    type="button"
                  >
                    <Link href={option.href}>
                      {isValid ? (
                        <TagIcon
                          className="w-8 h-8"
                          name={option.name.toLowerCase()}
                        />
                      ) : null}
                    </Link>
                  </Button>
                ) : (
                  <Button
                    className="rounded-full"
                    variant="ghost"
                    role="link"
                    type="button"
                  >
                    {option.icon && isValid ? (
                      <TagIcon
                        className="w-8 h-8"
                        name={option.name.toLowerCase()}
                      />
                    ) : null}
                  </Button>
                )}
              </li>
            );
          })}
        </ul>
        <section>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                className="rounded-full hover:bg-primary h-fit w-fit"
              >
                <Avatar>
                  <AvatarImage src={currentUser?.image || ""} />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </Button>
            </PopoverTrigger>
            <PopoverContent
              side="top"
              align="end"
              className="bg-black ml-10 mb-5"
            >
              <section className="flex flex-col gap-y-4">
                <div className="flex flex-col gap-y-2">
                  {currentUser?.accounts?.map((account) => (
                    <div key={account.id} className="flex gap-3 items-start">
                      <img
                        className="w-10 h-10 rounded-full"
                        src={
                          currentUser.image || "https://via.placeholder.com/150"
                        }
                        alt=""
                      />
                      <div className="flex justify-between items-center w-full">
                        <div className="flex flex-col gap-y-1">
                          <p className="font-bold">{currentUser?.name}</p>
                          <p className="text-sm font-extralight text-gray-400">
                            {currentUser?.username || currentUser?.name}
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          className="rounded-full hover:bg-primary h-fit w-fit"
                        >
                          <TagIcon className="w-5 h-5" name="check" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="border-t border-gray-700 w-full"></div>
                <div className="flex flex-col gap-y-5 pt-2">
                  <Link className="font-bold text-md hover:text-primary transition-colors duration-300" href="#">
                    Agregar una cuenta existente
                  </Link>
                  <Link className="font-bold text-md hover:text-primary transition-colors duration-300" href="#">
                    Administrar cuentas
                  </Link>
                  <ButtonSignOut currentUser={currentUser} />
                </div>
              </section>
            </PopoverContent>
          </Popover>
        </section>
      </div>
    </section>
  );
};
