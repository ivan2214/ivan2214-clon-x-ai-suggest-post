import { db as prisma } from "../../lib/db";
import { faker } from "@faker-js/faker";

export async function createUsers() {
  const users = Array.from({ length: 10 }).map(() => ({
    email: faker.internet.email(),
    name: faker.person.fullName(),
    hashedPassword: faker.internet.password(),
    image: faker.image.avatar(),
    username: faker.internet.userName(),
    bio: faker.person.bio(),
  }));

  await prisma.user.createMany({ data: users });
}
