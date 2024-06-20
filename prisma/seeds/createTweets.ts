import {faker} from "@faker-js/faker"
import {type User, type Content, type Tweet} from "@prisma/client"

import {db as prisma} from "../../lib/db"

import {createTweet} from "./createTweet"
import {createComment} from "./createComment"

// Definición de tipos para los objetos de Prisma
export type UserObject = Pick<User, "id">

export type ContentObject = Pick<Content, "id">

export type TweetObject = Pick<Tweet, "id" | "createdAt" | "authorId">

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
    const numberOfComments: number = faker.number.int({min: 1, max: 10})

    for (let k = 0; k < numberOfComments; k++) {
      const commentUser: UserObject = users[Math.floor(Math.random() * users.length)]

      await createComment(originalTweet.id, commentUser.id)
    }
  }
}
