import { Tweet } from "@prisma/client";
import { db as prisma } from "../../lib/db";
import { faker } from "@faker-js/faker";

export async function createTweets() {
  const users = await prisma.user.findMany();
  const selectUser = users[Math.floor(Math.random() * users.length)];
  const numberOfTweets = faker.number.int({ min: 5, max: 10 });

  for (let i = 0; i < numberOfTweets; i++) {
    const tweet = await prisma.tweet.create({
      data: {
        description: faker.lorem.paragraph(),
        authorId: selectUser.id,
        likes: faker.number.int({ min: 0, max: 100 }),
        plays: faker.number.int({ min: 0, max: 100 }),
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
