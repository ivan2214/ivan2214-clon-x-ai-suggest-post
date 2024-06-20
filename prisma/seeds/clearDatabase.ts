import {db as prisma} from "../../lib/db"

export async function clearDatabase() {
  await prisma.$transaction([
    prisma.account.deleteMany(),
    prisma.mediaUrl.deleteMany(),
    prisma.tweet.deleteMany(),
    prisma.user.deleteMany(),
    prisma.verificationToken.deleteMany(),
  ])
}
