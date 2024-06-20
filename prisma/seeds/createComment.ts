import {faker} from "@faker-js/faker"
import {} from "@prisma/client"

import {db as prisma} from "../../lib/db"

import {type ContentObject, type TweetObject} from "./createTweets"

export async function createComment(parentTweetId: string, authorId: string): Promise<TweetObject> {
  const commentContent: ContentObject = await prisma.content.create({
    data: {
      text: faker.lorem.sentence(),
    },
  })

  const comment = await prisma.tweet.create({
    data: {
      likes: faker.number.int({min: 0, max: 5000}),
      plays: faker.number.int({min: 50, max: 5000}),
      bookmarks: faker.number.int({min: 1, max: 5000}),
      shares: faker.number.int({min: 0, max: 5000}),
      retweets: faker.number.int({min: 0, max: 5000}),
      authorId,
      contentId: commentContent.id,
      createdAt: faker.date.recent(),
      typeTweet: "REPLY",
    },
  })

  // Crear relación en TweetsOnUsers para el comentario
  await prisma.tweetsOnUsers.create({
    data: {
      userId: authorId,
      tweetId: comment.id,
      parentId: parentTweetId, // Establecer el parentId para vincular el comentario con su tweet padre
      createdAt: comment.createdAt,
    },
  })

  return comment
}
