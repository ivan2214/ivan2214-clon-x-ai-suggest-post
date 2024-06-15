import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sidebar } from "@/app/(routes)/components/sidebar";
import { TwitterCard } from "@/components/twitter-card";
import TweetForm from "@/components/tweet-form";
import { SidebarSearch } from "@/app/(routes)/components/sidebar-search";
import { db } from "@/lib/db";
import { auth } from "@/auth";
import { getUserById } from "@/data/user";

const headerOptions = [
  "Para ti",
  "Siguiendo",
  "Liberalismo muscular",
  "Free market",
  "Javier milei",
  "Todos",
];

export default async function HomePageX() {
  const tweets = await db.tweet.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      author: true,
      replies: {
        include: {
          author: true,
          comment: true,
          tweet: true,
        },
      },
      mediaUrl: true,
    },
  });

  const user = await auth();
  const currentUser = await getUserById(user?.user.id);

  return (
    <main className="w-full h-full container px-20 grid grid-cols-9">
      {/* sidebar */}

      <aside className="col-span-1 border-r flex justify-center items-center">
        <Sidebar currentUser={currentUser} />
      </aside>
      {/* content */}
      <section className="col-span-5 border-r">
        <header className="flex items-center overflow-hidden group relative border-b">
          <div className="flex">
            {headerOptions.map((option) => (
              <Link href={`/${option}`} key={option}>
                <Button
                  size="sm"
                  className="text-base font-extralight rounded-none p-5"
                  variant="ghost"
                >
                  {option}
                </Button>
              </Link>
            ))}
          </div>
          <Button
            variant="ghost"
            className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute right-0 rounded-full"
          >
            ➡️
          </Button>
        </header>
        <div className="mt-2">
          {/* form post a tweet */}

          <TweetForm />
          {/* list tweets */}
          <div className="flex flex-col w-full">
            {tweets.map((tweet) => (
              <TwitterCard key={tweet.id} tweet={tweet} />
            ))}
          </div>
        </div>
      </section>

      {/* sidebar search */}
      <aside className="col-span-3">
        <SidebarSearch />
      </aside>
    </main>
  );
}
