import {faker} from "@faker-js/faker"
import {type User, type Content, type Tweet} from "@prisma/client"

import {db as prisma} from "../../lib/db"

// Definición de tipos para los objetos de Prisma
type UserObject = Pick<User, "id">
type ContentObject = Pick<Content, "id">
type TweetObject = Pick<Tweet, "id" | "createdAt" | "authorId">

// Función para crear un tweet
async function createTweet(authorId: string, contentId: string): Promise<TweetObject> {
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
    },
  })

  return tweet
}

// Función para crear un comentario
async function createComment(parentTweetId: string, authorId: string): Promise<TweetObject> {
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

// Función principal para crear tweets y sus comentarios
export async function createTweets(): Promise<void> {
  const users: UserObject[] = await prisma.user.findMany()
  const numberOfTweets: number = faker.number.int({min: 10, max: 30})

  for (let i = 0; i < numberOfTweets; i++) {
    const selectUser: UserObject = users[Math.floor(Math.random() * users.length)]

    const contentTweet: ContentObject = await prisma.content.create({
      data: {
        text: faker.lorem.paragraph(),
      },
    })

    const originalTweet: TweetObject = await createTweet(selectUser.id, contentTweet.id)

    const numberOfMediaUrls: number = faker.number.int({min: 0, max: 3})

    for (let j = 0; j < numberOfMediaUrls; j++) {
      await prisma.mediaUrl.create({
        data: {
          url: faker.image.url(),
          contentId: contentTweet.id,
        },
      })
    }

    // Determine random number of comments for each tweet
    const numberOfComments: number = faker.number.int({min: 1, max: 55})

    for (let k = 0; k < numberOfComments; k++) {
      const commentUser: UserObject = users[Math.floor(Math.random() * users.length)]

      await createComment(originalTweet.id, commentUser.id)
    }
  }
}
