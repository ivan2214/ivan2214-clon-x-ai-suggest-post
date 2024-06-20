import {DownloadIcon} from "@radix-ui/react-icons"
import {FaSave} from "react-icons/fa"
import {type Tweet} from "@prisma/client"

import {TagIcon} from "./icons/icons"

type SafeTweet = Omit<Tweet, "authorId" | "contentId" | "typeTweet">

interface TweetExtends extends SafeTweet {
  author: {
    name: string
    username: string
    image?: string | null
  }
  content: {
    id: string
    text?: string | null
    mediaUrls?: {url: string; id: string}[]
  }
  comments: {
    tweet: {
      id: string
      bookmarks: number
      likes: number
      plays: number
      shares: number
      retweets: number
      createdAt: Date
      content: {
        id: string
        text?: string | null
        mediaUrls?: {url: string; id: string}[]
      }
      author: {
        name: string
        username: string
        image?: string | null
      }
      _count: {
        comments: number
      }
    }
  }[]
}

export interface TwitterCardProps {
  tweet: TweetExtends
}

const getTimeAgo = (createdAt: Date) => {
  const now = Date.now()
  const diff = now - new Date(createdAt).getTime()

  const seconds = Math.floor(diff / 1000)

  if (seconds < 60) return `${seconds} seg`

  const minutes = Math.floor(seconds / 60)

  if (minutes < 60) return `${minutes} min`

  const hours = Math.floor(minutes / 60)

  if (hours < 24) return `${hours} hora${hours !== 1 ? "s" : ""}`

  const days = Math.floor(hours / 24)

  if (days < 7) return `hace ${days} día${days !== 1 ? "s" : ""}`

  const createdAtDate = new Date(createdAt)
  const currentYear = new Date().getFullYear()
  const createdYear = createdAtDate.getFullYear()

  const options: Intl.DateTimeFormatOptions = {day: "numeric", month: "long"}

  if (currentYear === createdYear) {
    return createdAtDate.toLocaleDateString("es-ES", options)
  } else {
    return createdAtDate.toLocaleDateString("es-ES", {
      ...options,
      year: "numeric",
    })
  }
}

export const TwitterCard: React.FC<TwitterCardProps> = ({tweet}) => {
  return (
    <article className="flex h-full w-full items-center justify-center overflow-hidden border-b p-5">
      <section className="flex w-full items-start gap-x-2">
        {/* image profile */}
        <section className="h-11 w-11 overflow-hidden rounded-full">
          <img
            alt={tweet.author.name || ""}
            className="h-full w-full"
            src={tweet.author.image || ""}
          />
        </section>
        {/* body */}
        <section className="flex h-full w-full flex-col items-start">
          <section className="flex w-full items-center justify-between">
            <div className="flex items-center">
              <div className="flex items-center gap-x-2">
                <div className="flex items-center gap-x-1">
                  <span className="text-base font-bold text-black dark:text-white">
                    {tweet.author.name}
                  </span>
                  <span className="text-sm font-extralight text-gray-300">
                    {tweet.author.username}
                  </span>
                </div>
                <span className="text-sm font-extralight text-gray-300">·</span>
                <span className="text-sm font-extralight text-gray-300">
                  {getTimeAgo(tweet.createdAt)}
                </span>
              </div>
            </div>
            <TagIcon className="h-4 w-4" name="moreoptions" />
          </section>

          <section className="flex w-full flex-col items-center gap-y-5">
            {/* content */}
            <section className="flex w-full flex-col items-start gap-y-3">
              <p className="text-base font-semibold">{tweet.content.text}</p>
              {tweet.content.mediaUrls && tweet.content.mediaUrls.length > 0 ? (
                <div className="h-auto max-w-full rounded-xl">
                  <img
                    alt={tweet.content.text || ""}
                    className="h-auto max-h-[550px] w-full rounded-xl object-cover"
                    src={tweet.content.mediaUrls[0].url || "https://picsum.photos/200"}
                  />
                </div>
              ) : null}
            </section>

            {/* buttons */}
            <section className="flex w-full items-center justify-between">
              <section className="w-3/4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                      <g>
                        <path d="M14.046 2.242l-4.148-.01h-.002c-4.374 0-7.8 3.427-7.8 7.802 0 4.098 3.186 7.206 7.465 7.37v3.828c0 .108.044.286.12.403.142.225.384.347.632.347.138 0 .277-.038.402-.118.264-.168 6.473-4.14 8.088-5.506 1.902-1.61 3.04-3.97 3.043-6.312v-.017c-.006-4.367-3.43-7.787-7.8-7.788zm3.787 12.972c-1.134.96-4.862 3.405-6.772 4.643V16.67c0-.414-.335-.75-.75-.75h-.396c-3.66 0-6.318-2.476-6.318-5.886 0-3.534 2.768-6.302 6.3-6.302l4.147.01h.002c3.532 0 6.3 2.766 6.302 6.296-.003 1.91-.942 3.844-2.514 5.176z" />
                      </g>
                    </svg>
                    {tweet.comments && tweet?.comments?.length > 0 ? (
                      <span className="ml-1 text-sm">{tweet.comments?.length}</span>
                    ) : null}
                  </div>

                  <div className="flex items-center">
                    <svg
                      className="h-4 w-4 fill-current"
                      viewBox="0 0 1024 1024"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M136 552h63.6c4.4 0 8-3.6 8-8V288.7h528.6v72.6c0 1.9.6 3.7 1.8 5.2a8.3 8.3 0 0 0 11.7 1.4L893 255.4c4.3-5 3.6-10.3 0-13.2L749.7 129.8a8.22 8.22 0 0 0-5.2-1.8c-4.6 0-8.4 3.8-8.4 8.4V209H199.7c-39.5 0-71.7 32.2-71.7 71.8V544c0 4.4 3.6 8 8 8m752-80h-63.6c-4.4 0-8 3.6-8 8v255.3H287.8v-72.6c0-1.9-.6-3.7-1.8-5.2a8.3 8.3 0 0 0-11.7-1.4L131 768.6c-4.3 5-3.6 10.3 0 13.2l143.3 112.4c1.5 1.2 3.3 1.8 5.2 1.8c4.6 0 8.4-3.8 8.4-8.4V815h536.6c39.5 0 71.7-32.2 71.7-71.8V480c-.2-4.4-3.8-8-8.2-8"
                        fill="currentColor"
                      />
                    </svg>
                    {tweet.retweets > 0 && (
                      <span className="ml-1 text-sm">{tweet.retweets.toLocaleString("es")}</span>
                    )}
                  </div>

                  <div className="flex items-center">
                    <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                      <g>
                        <path d="M12 21.638h-.014C9.403 21.59 1.95 14.856 1.95 8.478c0-3.064 2.525-5.754 5.403-5.754 2.29 0 3.83 1.58 4.646 2.73.814-1.148 2.354-2.73 4.645-2.73 2.88 0 5.404 2.69 5.404 5.755 0 6.376-7.454 13.11-10.037 13.157H12zM7.354 4.225c-2.08 0-3.903 1.988-3.903 4.255 0 5.74 7.034 11.596 8.55 11.658 1.518-.062 8.55-5.917 8.55-11.658 0-2.267-1.823-4.255-3.903-4.255-2.528 0-3.94 2.936-3.952 2.965-.23.562-1.156.562-1.387 0-.014-.03-1.425-2.965-3.954-2.965z" />
                      </g>
                    </svg>
                    {tweet.likes > 0 && (
                      <span className="ml-1 text-sm">{tweet.likes.toLocaleString("es")}</span>
                    )}
                  </div>

                  <div className="flex items-center">
                    <svg
                      className="h-4 w-4 fill-current"
                      viewBox="0 0 22 22"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M7 18H4V8h3m5 10H9V4h3m5 14h-3v-7h3Z" fill="currentColor" />
                    </svg>
                    {tweet.plays > 0 && (
                      <span className="ml-1 text-sm">{tweet.plays.toLocaleString("es")}</span>
                    )}
                  </div>
                </div>
              </section>
              <div className="flex  items-center gap-x-6">
                <DownloadIcon className="h-4 w-4" name="download" />
                <FaSave className="h-4 w-4" />
              </div>
            </section>
          </section>
        </section>
      </section>
    </article>
  )
}
