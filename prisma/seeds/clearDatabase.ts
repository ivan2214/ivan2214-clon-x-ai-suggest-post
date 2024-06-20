import {db as prisma} from "../../lib/db"

export async function clearDatabase() {
  await prisma.$transaction([
    prisma.account.deleteMany(),
    prisma.content.deleteMany(),
    prisma.mediaUrl.deleteMany(),
    prisma.tweet.deleteMany(),
    prisma.tweetsOnUsers.deleteMany(),
    prisma.user.deleteMany(),
    prisma.verificationToken.deleteMany(),
  ])
}
