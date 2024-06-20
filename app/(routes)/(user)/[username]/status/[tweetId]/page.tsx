import Link from "next/link"
import {SlOptions} from "react-icons/sl"
import {FiShare} from "react-icons/fi"
import {CiBookmark, CiHeart} from "react-icons/ci"
import {AiOutlineRetweet} from "react-icons/ai"
import {ArrowLeftIcon} from "@radix-ui/react-icons"
import {format} from "date-fns"
import {es} from "date-fns/locale"
import {FaRegComment} from "react-icons/fa"

import {db} from "@/lib/db"
import {cn} from "@/lib/utils"
import {Button} from "@/components/ui/button"

interface TweetPageProps {
  params: {
    tweetId?: string
    username?: string
  }
}

export default async function TweetPage({params}: TweetPageProps) {
  const {tweetId, username} = params

  const tweet = await db.tweet.findUnique({
    where: {
      id: tweetId,
      author: {
        username: {
          equals: `@${username}`,
        },
      },
    },
    include: {
      author: true,
      comments: {
        include: {
          author: true,
          replies: true,
          mediaUrls: true,
        },
      },
      mediaUrl: true,
    },
  })

  if (!tweetId || !tweet) {
    return <div>No tweetId</div>
  }

  const createdAtDate = new Date(tweet.createdAt)

  // Formatear la fecha y la hora
  const formattedDate = format(createdAtDate, "p '·' d MMM. yyyy", {
    locale: es,
  })

  return (
    <article className="col-span-5 flex w-full flex-col items-center border-r">
      <section className="sticky top-0 flex w-full items-center justify-start gap-x-5 p-5 backdrop-blur-md">
        <Link href="/home">
          <ArrowLeftIcon className="h-6 w-6" />
        </Link>
        <h1 className="text-xl font-bold">Post</h1>
      </section>
      <section className="flex w-full flex-col items-center gap-y-3">
        {/* header */}
        <section className="flex w-full items-center justify-between px-5">
          <section className="flex w-full items-start gap-x-2">
            {/* image profile */}
            <div className="h-11 w-11 overflow-hidden rounded-full">
              <img
                alt={tweet.author.name || ""}
                className="h-full w-full"
                src={tweet.author.image || ""}
              />
            </div>
            {/* name and username */}
            <div className="flex flex-col items-start">
              <p className="text-base font-bold">{tweet.author.name}</p>
              <span className="text-sm font-extralight text-gray-300">{tweet.author.username}</span>
            </div>
          </section>
          {/* options */}

          <Button
            className="transition-colors duration-200 hover:bg-primary/10 hover:text-primary"
            size="sm"
            variant="ghost"
          >
            <SlOptions className="" />
          </Button>
        </section>

        {/* content */}

        <section className="flex w-full flex-col items-center gap-y-5 px-5 py-2">
          <div>
            <p>{tweet.description}</p>
          </div>
          {tweet.mediaUrl.length > 1 ? (
            <section className="grid grid-cols-3 gap-2">
              {tweet.mediaUrl.map((media, index) => (
                <div
                  key={media.url}
                  className={cn(
                    "w-full overflow-hidden rounded-lg",
                    index === 0 ? "col-span-2" : "",
                    index === tweet.mediaUrl.length - 1 ? "col-span-full max-h-64" : "",
                  )}
                >
                  <img
                    alt={tweet.description || ""}
                    className="mx-auto aspect-square h-full w-full object-cover"
                    loading="lazy"
                    src={media.url}
                  />
                </div>
              ))}
            </section>
          ) : (
            tweet.mediaUrl.length > 0 && (
              <div className="w-full overflow-hidden rounded-lg">
                <img
                  alt={tweet.description || ""}
                  className="mx-auto aspect-square h-full w-full object-cover"
                  loading="lazy"
                  src={tweet.mediaUrl[0].url}
                />
              </div>
            )
          )}
        </section>

        {/* date and plays */}

        <section className="w-full px-5">
          <div className="flex items-center gap-x-2">
            <time
              className="text-sm font-extralight text-gray-300"
              dateTime={createdAtDate.toISOString()}
            >
              {formattedDate}
            </time>

            <p className="flex items-center gap-x-1 font-bold">
              · {tweet.plays.toLocaleString("es")}
              <span className="text-sm font-extralight text-gray-300">Reproducciones</span>
            </p>
          </div>
        </section>

        {/* buttons */}

        <section className="flex w-full items-center justify-between border-b border-t px-5 py-3">
          <div className="flex items-center gap-x-1 text-sm transition-colors duration-200 hover:text-primary">
            <FaRegComment className="h-5 w-5" />
            {tweet.comments.length > 0 ? <span>{tweet.comments.length}</span> : null}
          </div>
          <div className="flex items-center gap-x-1 text-sm transition-colors duration-200 hover:text-green-500">
            <AiOutlineRetweet className="h-5 w-5" />
            {tweet.retweets > 0 ? <span>{tweet.retweets}</span> : null}
          </div>
          <div className="flex items-center gap-x-1 text-sm transition-colors duration-200 hover:text-rose-500">
            <CiHeart className="h-5 w-5" />
            {tweet.likes > 0 ? <span>{tweet.likes}</span> : null}
          </div>
          <div className="flex items-center gap-x-1 text-sm transition-colors duration-200 hover:text-primary">
            <CiBookmark className="h-5 w-5" />
            {tweet.bookmarks > 0 ? <span>{tweet.bookmarks}</span> : null}
          </div>
          <div className="flex items-center gap-x-1 text-sm transition-colors duration-200 hover:text-primary">
            <FiShare className="h-5 w-5" />
            {tweet.shares > 0 ? <span>{tweet.shares}</span> : null}
          </div>
        </section>

        {/* comment form */}

        <section className="w-full">{/* <CommentForm tweetId={tweet.id} /> */}</section>

        {/* comments */}

        <section className="flex w-full flex-col items-center">
          {tweet.comments.length > 0 &&
            tweet.comments.map((comment) => {
              const userNameLink = comment.author.username.replace("@", "")

              return (
                <Link
                  key={comment.id}
                  className="w-full border-b border-t px-5 py-5"
                  href={`/${userNameLink}/status/${comment.id}`}
                >
                  <article>
                    {/* header */}
                    <section className="flex w-full items-center justify-between">
                      <section className="flex w-full items-start gap-x-2">
                        {/* image profile */}
                        <div className="h-11 w-11 overflow-hidden rounded-full">
                          <img
                            alt={comment.author.name || ""}
                            className="h-full w-full"
                            src={comment.author.image || ""}
                          />
                        </div>
                        {/* name and username */}
                        <div className="flex flex-col items-start">
                          <p className="text-base font-bold">{comment.author.name}</p>
                          <span className="text-sm font-extralight text-gray-300">
                            {comment.author.username}
                          </span>
                        </div>
                      </section>
                      {/* options */}
                      <Button
                        className="transition-colors duration-200 hover:bg-primary/10 hover:text-primary"
                        size="sm"
                        variant="ghost"
                      >
                        <SlOptions className="" />
                      </Button>
                    </section>
                    {/* content */}

                    <section className="flex w-full flex-col items-center gap-y-5 py-2">
                      <div>
                        <p>{comment.content}</p>
                      </div>
                      {comment.mediaUrls.length > 1 ? (
                        <section className="grid grid-cols-[repeat(2,minmax(0,150px))] gap-2">
                          {comment.mediaUrls.map((media) => (
                            <div
                              key={media.url}
                              className={cn("w-full overflow-hidden rounded-lg")}
                            >
                              <img
                                alt={comment.content || ""}
                                className="mx-auto aspect-square h-full w-full object-cover"
                                loading="lazy"
                                src={media.url}
                              />
                            </div>
                          ))}
                        </section>
                      ) : (
                        comment.mediaUrls.length > 0 && (
                          <div className="w-full overflow-hidden rounded-lg">
                            <img
                              alt={comment.content || ""}
                              className="mx-auto aspect-square h-full w-full object-cover"
                              loading="lazy"
                              src={comment.mediaUrls[0].url}
                            />
                          </div>
                        )
                      )}
                    </section>

                    {/* buttons */}

                    <section className="mt-3 flex w-full items-center justify-between">
                      <div className="flex items-center gap-x-1 text-sm transition-colors duration-200 hover:text-primary">
                        <FaRegComment className="h-5 w-5" />
                        {comment.replies.length > 0 ? <span>{comment.replies.length}</span> : null}
                      </div>
                      <div className="flex items-center gap-x-1 text-sm transition-colors duration-200 hover:text-green-500">
                        <AiOutlineRetweet className="h-5 w-5" />
                        {comment.retweets > 0 ? <span>{comment.retweets}</span> : null}
                      </div>
                      <div className="flex items-center gap-x-1 text-sm transition-colors duration-200 hover:text-rose-500">
                        <CiHeart className="h-5 w-5" />
                        {comment.likes > 0 ? <span>{comment.likes}</span> : null}
                      </div>
                      <div className="flex items-center gap-x-1 text-sm transition-colors duration-200 hover:text-primary">
                        <CiBookmark className="h-5 w-5" />
                        {comment.bookmarks > 0 ? <span>{comment.bookmarks}</span> : null}
                      </div>
                      <div className="flex items-center gap-x-1 text-sm transition-colors duration-200 hover:text-primary">
                        <FiShare className="h-5 w-5" />
                        {comment.shares > 0 ? <span>{comment.shares}</span> : null}
                      </div>
                    </section>
                  </article>
                </Link>
              )
            })}
        </section>
      </section>
    </article>
  )
}
