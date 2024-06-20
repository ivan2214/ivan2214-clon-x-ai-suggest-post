"use client"

import type * as z from "zod"

import {useTransition} from "react"
import {useForm} from "react-hook-form"
import {zodResolver} from "@hookform/resolvers/zod"
import {toast} from "sonner"

import {TweetSchema} from "@/schemas"
import {Form, FormControl, FormField, FormItem, FormMessage} from "@ui/form"
import {Button} from "@ui/button"
import {createCommentTweet} from "@/actions/create-comment-tweet"
import {type UserExtend} from "@/data/user"
import {Textarea} from "@/components/ui/textarea"

interface CommentFormProps {
  tweetId: string
  currentUser?: UserExtend | null
  username: string
}

export type TweetFormValues = z.infer<typeof TweetSchema>

export default function CommentForm({currentUser, tweetId, username}: CommentFormProps) {
  const [isPending, startTransition] = useTransition()
  const form = useForm<TweetFormValues>({
    defaultValues: {
      content: {
        mediaUrls: [],
        text: "",
      },
      typeTweet: "REPLY",
      parentId: tweetId,
    },
    resolver: zodResolver(TweetSchema),
  })

  function onSubmit(values: TweetFormValues) {
    startTransition(() => {
      createCommentTweet(values, username)
        .then((res) => {
          if (res?.error) {
            toast("Something went wrong", {
              description: res.error || "Please try again",
            })
          }
          if (res?.success) {
            toast("Your comment was posted", {
              description: res.success || "Please try again",
            })
          }
        })
        .finally(() => {
          form.reset()
        })
    })
  }

  return (
    <Form {...form}>
      <form
        className="flex w-full items-center gap-x-1 px-5"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <section className="h-11 w-11 overflow-hidden rounded-full">
          <img
            alt={currentUser?.name || ""}
            className="h-full w-full"
            src={currentUser?.image || ""}
          />
        </section>
        <section className="flex w-full items-center justify-between">
          <FormField
            control={form.control}
            name="content.text"
            render={({field}) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    className="resize-none border-none text-lg font-light text-gray-300 focus-visible:ring-0"
                    maxLength={300}
                    placeholder="Postea tu respuesta"
                    rows={1}
                    {...field}
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button disabled={isPending} type="submit">
            Responder
          </Button>
        </section>
      </form>
    </Form>
  )
}
