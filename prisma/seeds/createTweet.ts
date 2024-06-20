import {faker} from "@faker-js/faker"

import {db as prisma} from "../../lib/db"

import {type TweetObject} from "./createTweets"

export async function createTweet(authorId: string, contentId: string): Promise<TweetObject> {
  const tweet = await prisma.tweet.create({
    data: {
      likes: faker.number.int({min: 0, max: 500000}),
      plays: faker.number.int({min: 500, max: 500000}),
      bookmarks: faker.number.int({min: 10, max: 500000}),
      shares: faker.number.int({min: 5, max: 500000}),
      retweets: faker.number.int({min: 0, max: 500000}),
      authorId,
      contentId,
      createdAt: faker.date.recent(),
      typeTweet: "TWEET",
    },
  })

  return tweet
}
