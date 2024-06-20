"use server"
import {revalidatePath} from "next/cache"

import {type TweetFormValues} from "@/app/(routes)/(user)/[username]/status/[tweetId]/components/comment-form"
import {auth} from "@/auth"
import {getUserById} from "@/data/user"
import {db} from "@/lib/db"
import {TweetSchema} from "@/schemas"

export const createCommentTweet = async (values: TweetFormValues, username: string) => {
  try {
    const session = await auth()

    const user = await getUserById(session?.user.id)

    const validatedFields = TweetSchema.safeParse(values)

    if (!validatedFields.success || !user) {
      return {error: "Invalid fields!"}
    }

    const {content, typeTweet, parentId} = validatedFields.data

    const parentTweet = parentId ? await db.tweet.findUnique({where: {id: parentId}}) : undefined

    if (!parentTweet) {
      return {error: "Invalid parent tweet!"}
    }

    const contentCreated = await db.content.create({
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

    const tweetComment = await db.tweet.create({
      data: {
        authorId: user.id,
        contentId: contentCreated.id,
        typeTweet,
      },
    })

    await db.tweetsOnUsers.create({
      data: {
        userId: user.id,
        tweetId: tweetComment.id,
        parentId: parentTweet.id,
      },
    })

    return {
      success: "Comment created",
    }
  } catch (error) {
    return {error: "Something went wrong"}
  } finally {
    revalidatePath(`/${username}/status/${values.parentId}`)
  }
}
