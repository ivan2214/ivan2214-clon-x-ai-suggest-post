import {faker} from "@faker-js/faker"

import {db as prisma} from "../../lib/db"

export async function createTweets() {
  const users = await prisma.user.findMany()
  const numberOfTweets = faker.number.int({min: 10, max: 60})

  for (let i = 0; i < numberOfTweets; i++) {
    const selectUser = users[Math.floor(Math.random() * users.length)]

    const content = await prisma.content.create({
      data: {
        text: faker.lorem.paragraph(),
      },
    })

    const tweet = await prisma.tweet.create({
      data: {
        likes: faker.number.int({min: 0, max: 500000}),
        plays: faker.number.int({min: 500, max: 500000}),
        bookmarks: faker.number.int({min: 10, max: 500000}),
        shares: faker.number.int({min: 5, max: 500000}),
        retweets: faker.number.int({min: 0, max: 500000}),
        authorId: selectUser.id,
        contentId: content.id,
        createdAt: faker.date.recent(),
      },
    })

    // Create relation in TweetsOnUsers
    await prisma.tweetsOnUsers.create({
      data: {
        userId: selectUser.id,
        tweetId: tweet.id,
        createdAt: tweet.createdAt,
      },
    })

    const numberOfMediaUrls = faker.number.int({min: 0, max: 3})

    for (let j = 0; j < numberOfMediaUrls; j++) {
      await prisma.mediaUrl.create({
        data: {
          url: faker.image.url(),
          contentId: content.id,
        },
      })
    }

    // Optionally create comments for the tweet
    const numberOfComments = faker.number.int({min: 0, max: 5})

    for (let k = 0; k < numberOfComments; k++) {
      const commentUser = users[Math.floor(Math.random() * users.length)]
      const commentContent = await prisma.content.create({
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
          authorId: commentUser.id,
          contentId: commentContent.id,
          createdAt: faker.date.recent(),
        },
      })

      // Create relation in TweetsOnUsers for the comment
      await prisma.tweetsOnUsers.create({
        data: {
          userId: commentUser.id,
          tweetId: comment.id,
          parentId: tweet.id, // Associate the comment with the parent tweet
          createdAt: comment.createdAt,
        },
      })

      const numberOfCommentMediaUrls = faker.number.int({min: 0, max: 2})

      for (let l = 0; l < numberOfCommentMediaUrls; l++) {
        await prisma.mediaUrl.create({
          data: {
            url: faker.image.url(),
            contentId: commentContent.id,
          },
        })
      }
    }
  }
}
