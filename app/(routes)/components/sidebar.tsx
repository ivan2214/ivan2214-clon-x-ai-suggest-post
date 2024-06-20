import Link from "next/link"
import React from "react"

import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar"
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover"
import {Button} from "@ui/button"
import {sidebarOptions} from "@/constants"
import {TagIcon, TagIcons} from "@/components/icons/icons"
import {type UserExtend} from "@/data/user"

import {ButtonSignOut} from "./button-sign-out"

interface SidebarProps {
  currentUser?: UserExtend | null
}

export const Sidebar: React.FC<SidebarProps> = ({currentUser}) => {
  return (
    <section className="fixed top-0 flex h-full flex-col items-center justify-center p-4">
      {/* logo */}

      <div className="flex h-full w-full flex-col items-center justify-between">
        <ul className="flex h-full flex-col items-center gap-y-1">
          <Link href="/">
            <img
              alt="logo"
              className="mx-auto h-12 w-12 rounded-full object-cover"
              src="https://imgs.search.brave.com/zbvB3wCiEbb71hYQHjG-8saDi71vPc4yOVhzizCo_8k/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTIy/NjM4NjQzMC92ZWN0/b3IvdmVjdG9yLWRv/dWJsZS1saW5lLWFs/dGVybmF0aXZlLWxv/Z28tbGV0dGVyLXgu/anBnP3M9NjEyeDYx/MiZ3PTAmaz0yMCZj/PWx4UWZCZmNULVJi/UG9ZZVVRUmNsb01o/VG56RnlGQjJndEdZ/N2JVcUtzU2M9"
            />
          </Link>
          {sidebarOptions.map((option) => {
            const isValid = option.name.toLowerCase() in TagIcons

            return (
              <li key={option.name}>
                {option.href ? (
                  <Button
                    className="h-fit w-fit rounded-full"
                    role="link"
                    type="button"
                    variant="ghost"
                  >
                    <Link href={option.href}>
                      {isValid ? (
                        <TagIcon className="h-8 w-8" name={option.name.toLowerCase()} />
                      ) : null}
                    </Link>
                  </Button>
                ) : (
                  <Button className="rounded-full" role="link" type="button" variant="ghost">
                    {option.icon && isValid ? (
                      <TagIcon className="h-8 w-8" name={option.name.toLowerCase()} />
                    ) : null}
                  </Button>
                )}
              </li>
            )
          })}
        </ul>
        <section>
          <Popover>
            <PopoverTrigger asChild>
              <Button className="h-fit w-fit rounded-full hover:bg-primary" variant="ghost">
                <Avatar>
                  <AvatarImage src={currentUser?.image || ""} />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </Button>
            </PopoverTrigger>
            <PopoverContent align="end" className="mb-5 ml-10 bg-black" side="top">
              <section className="flex flex-col gap-y-4">
                <div className="flex flex-col gap-y-2">
                  {currentUser?.accounts?.map((account) => (
                    <div key={account.id} className="flex items-start gap-3">
                      <img
                        alt=""
                        className="h-10 w-10 rounded-full"
                        src={currentUser.image || "https://via.placeholder.com/150"}
                      />
                      <div className="flex w-full items-center justify-between">
                        <div className="flex flex-col gap-y-1">
                          <p className="font-bold">{currentUser?.name}</p>
                          <p className="text-sm font-extralight text-gray-400">
                            {currentUser?.username || currentUser?.name}
                          </p>
                        </div>
                        <Button
                          className="h-fit w-fit rounded-full hover:bg-primary"
                          variant="ghost"
                        >
                          <TagIcon className="h-5 w-5" name="check" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="w-full border-t border-gray-700" />
                <div className="flex flex-col gap-y-5 pt-2">
                  <Link
                    className="text-md font-bold transition-colors duration-300 hover:text-primary"
                    href="#"
                  >
                    Agregar una cuenta existente
                  </Link>
                  <Link
                    className="text-md font-bold transition-colors duration-300 hover:text-primary"
                    href="#"
                  >
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
  )
}
