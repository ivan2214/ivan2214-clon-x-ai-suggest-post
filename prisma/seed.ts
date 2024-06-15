import { PrismaClient } from "@prisma/client";
import { clearDatabase } from "./seeds/clearDatabase";
import { createUsers } from "./seeds/createUsers";
import { createTweets } from "./seeds/createTweets";
import { createReplyComments } from "./seeds/createReplyComments";

const prisma = new PrismaClient();

async function main() {
  // Verifica si ya existen datos en la base de datos
  const [userCount] = await prisma.$transaction([prisma.user.count()]);

  if (userCount > 0) {
    console.log("Data already exists. Skipping seed.");
    return;
  }

  // Limpia la base de datos
  await clearDatabase();

  // Crea nuevos datos
  await prisma.$transaction(async () => {
    await createUsers();
    await createTweets();
    await createReplyComments();
  });

  console.log("Database seeded successfully.");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
