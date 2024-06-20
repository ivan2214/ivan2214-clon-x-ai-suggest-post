import {TypeTweet} from "@prisma/client"
import * as z from "zod"

export const LoginSchema = z.object({
  email: z.string().email({message: "Email is required"}),
  password: z.string().min(1, {message: "Password is required"}),
})

export const RegisterSchema = z.object({
  email: z.string().email({message: "Email is required"}),
  password: z.string().min(6, {message: "Password must be at least 6 characters"}),
  name: z.string().min(1, {message: "Name is required"}),
  username: z.string().min(1, {message: "Username is required"}),
})

export const TypeTweetSchema = z.enum([
  TypeTweet.BOOKMARK,
  TypeTweet.LIKE,
  TypeTweet.REPLY,
  TypeTweet.RETWEET,
  TypeTweet.SHARE,
  TypeTweet.TWEET,
])

// Define the schema for MediaUrl
export const MediaUrlSchema = z.object({
  url: z.string().url(),
})

// Define the schema for Content
export const ContentSchema = z.object({
  text: z.string().optional(),
  mediaUrls: z.array(MediaUrlSchema).optional(),
})

// Define the schema for a Tweet
export const TweetSchema = z.object({
  typeTweet: TypeTweetSchema,
  content: ContentSchema,
  parentId: z.string().cuid().optional(),
  // For retweets, the original tweet's ID is required
  originalTweetId: z.string().cuid().optional(),
})
