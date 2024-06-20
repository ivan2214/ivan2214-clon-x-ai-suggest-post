import {PrismaClient} from "@prisma/client"

import {clearDatabase} from "./seeds/clearDatabase"
import {createUsers} from "./seeds/createUsers"
import {createTweets} from "./seeds/createTweets"

const prisma = new PrismaClient()

async function main() {
  // Verifica si ya existen datos en la base de datos
  const [accountCount, mediaUrlCount, tweetCount, userCount, verificationTokenCount] =
    await prisma.$transaction([
      prisma.account.count(),
      prisma.mediaUrl.count(),
      prisma.tweet.count(),
      prisma.user.count(),
      prisma.verificationToken.count(),
    ])

  if (
    userCount > 0 ||
    verificationTokenCount > 0 ||
    accountCount > 0 ||
    mediaUrlCount > 0 ||
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
