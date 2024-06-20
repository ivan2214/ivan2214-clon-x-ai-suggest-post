import {type Account, type User} from "@prisma/client"

import {db} from "@/lib/db"

export const getUserByEmail = async (email: string) => {
  try {
    const user = await db.user.findUnique({
      where: {
        email,
      },
    })

    return user
  } catch (error) {
    console.log(error)

    return null
  }
}

export interface UserExtend extends User {
  accounts: Account[] | null
  _count: {
    tweets: number
  }
}

export const getUserById = async (id?: string): Promise<UserExtend | null> => {
  if (!id) {
    return null
  }
  try {
    const user = await db.user.findUnique({
      where: {
        id,
      },
      include: {
        accounts: true,
        _count: {
          select: {
            tweets: true,
          },
        },
      },
    })

    return user
  } catch (error) {
    console.log(error)

    return null
  }
}
