import {faker} from "@faker-js/faker"

import {db} from "../../lib/db"

export const createComments = async () => {
  try {
    const users = await db.user.findMany()
    const tweets = await db.tweet.findMany()
    const numberOfComments = faker.number.int({min: 5, max: 35})

    for (let i = 0; i < numberOfComments; i++) {
      const selectUser = users[Math.floor(Math.random() * users.length)]
      const selectTweet = tweets[Math.floor(Math.random() * tweets.length)]
      const comment = await db.comment.create({
        data: {
          content: faker.lorem.paragraph(),
          authorId: selectUser.id,
          likes: faker.number.int({min: 0, max: 100}),
          tweetId: selectTweet.id,
          bookmarks: faker.number.int({min: 10, max: 100}),
          plays: faker.number.int({min: 500, max: 1000}),
          retweets: faker.number.int({min: 0, max: 500000}),
          shares: faker.number.int({min: 5, max: 500000}),
        },
      })

      const numberOfMediaUrls = faker.number.int({min: 0, max: 3})

      for (let j = 0; j < numberOfMediaUrls; j++) {
        await db.mediaUrl.create({
          data: {
            url: faker.image.url(),
            commentId: comment.id,
          },
        })
      }
    }
  } catch (error) {
    console.log(error)
  }
}
