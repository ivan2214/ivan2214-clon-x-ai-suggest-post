import { Tweet } from "@prisma/client";
import { db as prisma } from "../../lib/db";
import { faker } from "@faker-js/faker";

export async function createTweets() {
  const users = await prisma.user.findMany();
  const numberOfTweets = faker.number.int({ min: 5, max: 35 });

  for (let i = 0; i < numberOfTweets; i++) {
    const selectUser = users[Math.floor(Math.random() * users.length)];
    const tweet = await prisma.tweet.create({
      data: {
        description: faker.lorem.paragraph(),
        authorId: selectUser.id,
        likes: faker.number.int({ min: 0, max: 100 }),
        plays: faker.number.int({ min: 0, max: 100 }),
        createdAt: faker.date.anytime(),
      },
    });
    await prisma.mediaUrl.create({
      data: {
        url: faker.image.url(),
        tweetId: tweet.id,
      },
    });
  }
}
