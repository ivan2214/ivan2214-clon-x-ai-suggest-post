import Link from "next/link";
import { Button } from "@ui/button";
import { sidebarOptions } from "@/constants";
import React from "react";
import { TagIcon, TagIcons } from "@/components/icons/icons";

interface SidebarProps {}

export const Sidebar: React.FC<SidebarProps> = ({}) => {
  return (
    <section className="h-full items-center flex justify-center fixed top-0 flex-col gap-y-2 p-4">
      {/* logo */}

      <Button role="link" className="rounded-full" variant="ghost">
        <Link href="/">
          <img
            src="https://imgs.search.brave.com/zbvB3wCiEbb71hYQHjG-8saDi71vPc4yOVhzizCo_8k/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTIy/NjM4NjQzMC92ZWN0/b3IvdmVjdG9yLWRv/dWJsZS1saW5lLWFs/dGVybmF0aXZlLWxv/Z28tbGV0dGVyLXgu/anBnP3M9NjEyeDYx/MiZ3PTAmaz0yMCZj/PWx4UWZCZmNULVJi/UG9ZZVVRUmNsb01o/VG56RnlGQjJndEdZ/N2JVcUtzU2M9"
            alt="logo"
            className="h-12 w-12 object-cover rounded-full mx-auto"
          />
        </Link>
      </Button>

      <ul className="flex flex-col items-center h-full gap-y-5 pt-5">
        {sidebarOptions.map((option) => {
          const isValid = option.name.toLowerCase() in TagIcons;

          return (
            <li key={option.name}>
              {option.href ? (
                <Button
                  className="rounded-full"
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
                  title={option.name}
                  type="button"
                >
                  {isValid ? (
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
    </section>
  );
};
