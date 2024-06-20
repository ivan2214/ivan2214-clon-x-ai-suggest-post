import {faker} from "@faker-js/faker"

import {db as prisma} from "../../lib/db"

export async function createUsers() {
  const users = Array.from({length: 25}).map(() => ({
    email: faker.internet.email(),
    name: faker.person.fullName(),
    hashedPassword: faker.internet.password(),
    image: faker.image.avatar(),
    username: `@${faker.internet.userName()}`,
    bio: faker.person.bio(),
    emailVerified: Math.random() < 0.3 ? faker.date.recent() : null,
  }))

  await prisma.user.createMany({data: users})
}
