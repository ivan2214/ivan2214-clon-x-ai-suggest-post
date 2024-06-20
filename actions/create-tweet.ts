"use server"
import type * as z from "zod"

import {revalidatePath} from "next/cache"

import {auth} from "@/auth"
import {getUserById} from "@/data/user"
import {db} from "@/lib/db"
import {TweetSchema} from "@/schemas"
import {type TweetFormValues} from "@/app/(routes)/(user)/[username]/status/[tweetId]/components/comment-form"

export const createTweet = async (values: TweetFormValues) => {
  const currentUser = await auth()
  const user = await getUserById(currentUser?.user.id)
  const validatedFields = TweetSchema.safeParse(values)

  if (!validatedFields.success || !user) {
    return {error: "Invalid fields!"}
  }

  const {description, mediaUrls} = validatedFields.data

  const content = await db.content.create({
    data: {
      text: description,
      mediaUrls: mediaUrls?.length
        ? {
            createMany: {
              data: mediaUrls?.map((url) => url),
              skipDuplicates: true,
            },
          }
        : undefined,
    },
  })

  try {
    await db.tweet.create({
      data: {
        authorId: user.id,
        contentId: content.id,
      },
    })

    return {
      success: "Tweet created!",
    }
  } catch (error) {
    console.log(error)

    return {
      error: "Something went wrong!",
    }
  } finally {
    revalidatePath("/")
  }
}
