import { db } from "@/lib/db";
import { Account, ReplyComment, Tweet, User } from "@prisma/client";

export const getUserByEmail = async (email: string) => {
  try {
    const user = await db.user.findUnique({
      where: {
        email,
      },
    });

    return user;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export interface UserExtend extends User {
  accounts: Account[] | null;
  replies?: ReplyComment[] | null;
  tweets?: Tweet[] | null;
  _count: {
    tweets: number;
  };
}

export const getUserById = async (id?: string): Promise<UserExtend | null> => {
  if (!id) {
    return null;
  }
  try {
    const user = await db.user.findUnique({
      where: {
        id,
      },
      include: {
        accounts: true,
        replies: true,
        tweets: true,
        _count: {
          select: {
            tweets: true,
          },
        },
      },
    });

    return user;
  } catch (error) {
    console.log(error);
    return null;
  }
};
