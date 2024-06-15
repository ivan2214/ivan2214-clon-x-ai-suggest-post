import { db as prisma } from "../../lib/db";
import { faker } from "@faker-js/faker";

export async function createReplyComments() {
  const comments = await prisma.comment.findMany();
  const users = await prisma.user.findMany();

  const replyComments = comments.flatMap((comment) =>
    Array.from({ length: 2 }).map(() => ({
      commentId: comment.id,
      authorId: users[Math.floor(Math.random() * users.length)].id,
    })),
  );

  await prisma.replyComment.createMany({ data: replyComments });
}
