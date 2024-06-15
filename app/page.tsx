import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Sidebar } from "./components/sidebar";
import { fakeTweets } from "@/constants";
import { TwitterCard } from "@/components/twitter-card";
import TweetForm from "@/components/tweet-form";
import { SidebarSearch } from "./components/sidebar-search";

const headerOptions = [
  "Para ti",
  "Siguiendo",
  "Liberalismo muscular",
  "Free market",
  "Javier milei",
  "Todos",
];

export default function HomePageX() {
  return (
    <main className="w-full h-full container px-20 grid grid-cols-9">
      {/* sidebar */}

      <aside className="col-span-1 border-r flex justify-center items-center">
        <Sidebar />
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
            {fakeTweets.map((tweet) => (
              <TwitterCard key={tweet.name} {...tweet} />
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
