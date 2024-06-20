import React from "react"

import {db} from "@/lib/db"

interface UserNamePageProps {
  params: {
    username?: string
  }
}

const UserNamePage = ({params}: UserNamePageProps) => {
  const {username} = params
  const user = db.user.findFirst({where: {username: username}})

  if (!username || !user) {
    return <div>No username</div>
  }

  return <div>UserNamePage</div>
}

export default UserNamePage
