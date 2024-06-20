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
    include: {
      author: true,
      comments: true,
      mediaUrl: true,
    },
  })

  const user = await auth()
  const currentUser = await getUserById(user?.user.id)

  return (
    <section className="col-span-5 border-r">
      <header className="group relative flex items-center overflow-hidden border-b">
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
      {/* form post a tweet */}
      <div className="mt-2">
        <TweetForm currentUser={currentUser} />
      </div>
      {/* finr form post a tweet */}

      {/* list tweets */}
      <div className="flex w-full flex-col">
        {tweets.map((tweet) => (
          <Link key={tweet.id} href={`/tweet/${tweet.id}`}>
            <TwitterCard tweet={tweet} />
          </Link>
        ))}
      </div>
    </section>
  )
}
