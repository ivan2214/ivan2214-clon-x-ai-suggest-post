import {faker} from "@faker-js/faker"

import {db as prisma} from "../../lib/db"

export async function createReplyComments() {
  const comments = await prisma.comment.findMany()

  const users = await prisma.user.findMany()

  const numberOfReplyComments = faker.number.int({min: 5, max: 35})

  for (let i = 0; i < numberOfReplyComments; i++) {
    const selectComment = comments[Math.floor(Math.random() * comments.length)]

    const selectUser = users[Math.floor(Math.random() * users.length)]

    const replyComment = await prisma.replyComment.create({
      data: {
        authorId: selectUser.id,
        commentId: selectComment.id,
        content: faker.lorem.paragraph(),
        likes: faker.number.int({min: 0, max: 100}),
      },
    })

    const numberOfMediaUrls = faker.number.int({min: 0, max: 3})

    for (let j = 0; j < numberOfMediaUrls; j++) {
      await prisma.mediaUrl.create({
        data: {
          url: faker.image.url(),
          replyCommentId: replyComment.id,
        },
      })
    }
  }
}
