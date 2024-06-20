import {db as prisma} from "../../lib/db"

export async function clearDatabase() {
  await prisma.$transaction([
    prisma.account.deleteMany(),
    prisma.comment.deleteMany(),
    prisma.mediaUrl.deleteMany(),
    prisma.replyComment.deleteMany(),
    prisma.tweet.deleteMany(),
    prisma.user.deleteMany(),
    prisma.verificationToken.deleteMany(),
  ])
}
