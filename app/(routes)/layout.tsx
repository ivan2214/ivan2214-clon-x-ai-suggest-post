import {type ReactNode} from "react"
import {redirect} from "next/navigation"

import {Sidebar} from "@/app/(routes)/components/sidebar"
import {SidebarSearch} from "@/app/(routes)/components/sidebar-search"
import {auth} from "@/auth"
import {getUserById} from "@/data/user"

interface RoutesLayoutProps {
  children: ReactNode
}

export default async function RoutesLayout({children}: RoutesLayoutProps) {
  const user = await auth()
  const currentUser = await getUserById(user?.user.id)

  if (!currentUser) {
    redirect("/")
  }

  return (
    <main className="container grid h-full w-full grid-flow-row-dense grid-cols-9 px-20">
      {/* sidebar */}

      <aside className="flex items-center justify-center border-r">
        <Sidebar currentUser={currentUser} />
      </aside>
      {/* content */}
      {children}
      {/* sidebar search */}
      <aside className="col-span-3">
        <SidebarSearch />
      </aside>
    </main>
  )
}
