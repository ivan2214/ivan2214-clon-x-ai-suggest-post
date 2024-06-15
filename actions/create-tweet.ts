"use server";
import { auth } from "@/auth";
import { getUserById } from "@/data/user";
import { db } from "@/lib/db";
import { TweetSchema } from "@/schemas";
import { revalidatePath } from "next/cache";
import * as z from "zod";

export type TweetFormValues = z.infer<typeof TweetSchema>;

export const createTweet = async (values: TweetFormValues) => {
  const currentUser = await auth();
  const user = await getUserById(currentUser?.user.id);
  const validatedFields = TweetSchema.safeParse(values);

  if (!validatedFields.success || !user) {
    return { error: "Invalid fields!" };
  }

  const { description, mediaUrl } = validatedFields.data;

  try {
    const newTweet = await db.tweet.create({
      data: {
        authorId: user.id,
        description,
      },
    });

    if (mediaUrl) {
      await db.mediaUrl.createMany({
        data: mediaUrl.map((url) => ({
          url: url.url,
          tweetId: newTweet.id,
        })),
      });
    }

    return {
      success: "Tweet created!",
    };
  } catch (error) {
    console.log(error);
    return {
      error: "Something went wrong!",
    };
  } finally {
    revalidatePath("/");
  }
};
