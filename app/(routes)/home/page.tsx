import Link from "next/link"

import {Button} from "@/components/ui/button"
import {TwitterCard} from "@/components/twitter-card"
import TweetForm from "@/components/tweet-form"
import {db} from "@/lib/db"
import {auth} from "@/auth"
import {getUserById} from "@/data/user"

const headerOptions = [
  "Para ti",
  "Siguiendo",
  "Liberalismo muscular",
  "Free market",
  "Javier milei",
  "Todos",
]

export default async function HomePageX() {
  const tweets = await db.tweet.findMany({
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      author: {
        select: {
          name: true,
          username: true,
          image: true,
        },
      },
      content: {
        select: {
          id: true,
          text: true,
          mediaUrls: {
            select: {
              url: true,
              id: true,
            },
          },
        },
      },
      bookmarks: true,
      likes: true,
      plays: true,
      shares: true,
      retweets: true,
      createdAt: true,
      comments: {
        select: {
          tweet: {
            select: {
              id: true,
              content: {
                select: {
                  id: true,
                  text: true,
                  mediaUrls: {
                    select: {
                      url: true,
                      id: true,
                    },
                  },
                },
              },
              author: {
                select: {
                  name: true,
                  username: true,
                  image: true,
                },
              },
              bookmarks: true,
              likes: true,
              plays: true,
              shares: true,
              retweets: true,
              createdAt: true,
              _count: {
                select: {
                  comments: true,
                },
              },
            },
          },
        },
      },
    },
    take: 25,
  })

  const user = await auth()
  const currentUser = await getUserById(user?.user.id)

  return (
    <section className="col-span-5 border-r">
      <section className="sticky top-0 border-b bg-black/10 py-1 backdrop-blur-xl">
        <header className="group relative flex items-center overflow-hidden">
          <div className="flex">
            {headerOptions.map((option) => (
              <Link key={option} href={`/${option}`}>
                <Button
                  className="rounded-none p-5 text-base font-extralight"
                  size="sm"
                  variant="ghost"
                >
                  {option}
                </Button>
              </Link>
            ))}
          </div>
          <Button
            className="absolute right-0 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            variant="ghost"
          >
            ➡️
          </Button>
        </header>
      </section>
      {/* form post a tweet */}
      <div className="mt-2">
        <TweetForm currentUser={currentUser} />
      </div>
      {/* finr form post a tweet */}

      {/* list tweets */}
      <div className="flex w-full flex-col">
        {tweets.map((tweet) => {
          const userNameLink = tweet.author.username.replace("@", "")

          return (
            <Link key={tweet.id} href={`/${userNameLink}/status/${tweet.id}`}>
              <TwitterCard tweet={tweet} />
            </Link>
          )
        })}
      </div>
    </section>
  )
}
