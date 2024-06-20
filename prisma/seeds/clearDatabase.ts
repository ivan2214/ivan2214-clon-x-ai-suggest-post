import {db as prisma} from "../../lib/db"

export async function clearDatabase() {
  await prisma.$transaction([
    prisma.replyComment.deleteMany(),
    prisma.comment.deleteMany(),
    prisma.tweet.deleteMany(),
    prisma.account.deleteMany(),
    prisma.user.deleteMany(),
  ])
}
