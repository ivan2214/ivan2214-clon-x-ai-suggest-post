"use server"

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
    console.log("validatedFields", {validatedFields})

    return {error: "Invalid fields!"}
  }

  const {typeTweet = "TWEET", content} = validatedFields.data

  const contentTweet = await db.content.create({
    data: {
      text: content.text,
      mediaUrls: content.mediaUrls?.length
        ? {
            createMany: {
              data: content.mediaUrls?.map((url) => url),
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
        contentId: contentTweet.id,
        typeTweet,
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
