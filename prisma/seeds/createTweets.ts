import {faker} from "@faker-js/faker"

import {db as prisma} from "../../lib/db"

export async function createTweets() {
  const users = await prisma.user.findMany()
  const numberOfTweets = faker.number.int({min: 5, max: 35})

  for (let i = 0; i < numberOfTweets; i++) {
    const selectUser = users[Math.floor(Math.random() * users.length)]
    const tweet = await prisma.tweet.create({
      data: {
        description: faker.lorem.paragraph(),
        authorId: selectUser.id,
        likes: faker.number.int({min: 0, max: 500000}),
        plays: faker.number.int({min: 500, max: 500000}),
        bookmarks: faker.number.int({min: 10, max: 500000}),
        shares: faker.number.int({min: 5, max: 500000}),
        retweets: faker.number.int({min: 0, max: 500000}),
        createdAt: faker.date.past(),
      },
    })
    const numberOfMediaUrls = faker.number.int({min: 0, max: 3})

    for (let j = 0; j < numberOfMediaUrls; j++) {
      await prisma.mediaUrl.create({
        data: {
          url: faker.image.url(),
          tweetId: tweet.id,
        },
      })
    }
  }
}
