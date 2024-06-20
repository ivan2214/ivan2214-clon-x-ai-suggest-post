import {PrismaClient} from "@prisma/client"

import {clearDatabase} from "./seeds/clearDatabase"
import {createUsers} from "./seeds/createUsers"
import {createTweets} from "./seeds/createTweets"
import {createReplyComments} from "./seeds/createReplyComments"
import {createComments} from "./seeds/createComments"

const prisma = new PrismaClient()

async function main() {
  // Verifica si ya existen datos en la base de datos
  const [
    accountCount,
    commentCount,
    mediaUrlCount,
    replyCommentCount,
    tweetCount,
    userCount,
    verificationTokenCount,
  ] = await prisma.$transaction([
    prisma.account.count(),
    prisma.comment.count(),
    prisma.mediaUrl.count(),
    prisma.replyComment.count(),
    prisma.tweet.count(),
    prisma.user.count(),
    prisma.verificationToken.count(),
  ])

  if (
    userCount > 0 ||
    verificationTokenCount > 0 ||
    accountCount > 0 ||
    commentCount > 0 ||
    mediaUrlCount > 0 ||
    replyCommentCount > 0 ||
    tweetCount > 0
  ) {
    console.log("Data already exists. Skipping seed.")

    return
  }

  // Limpia la base de datos
  await clearDatabase()

  // Crea nuevos datos
  await prisma.$transaction(async () => {
    await createUsers()
    await createTweets()
    await createComments()
    await createReplyComments()
  })

  console.log("✅✅ Database seeded successfully.")
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e: unknown) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
