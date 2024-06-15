import { HTMLAttributes } from "react";
import { TagIcon } from "./icons/icons";
import { ReplyComment, Tweet, User } from "@prisma/client";

interface TweetExtends extends Tweet {
  author: User;
  replies: ReplyComment[];
}

export interface TwitterCardProps {
  className?: HTMLAttributes<HTMLDivElement>["className"];
  tweet: TweetExtends;
}

export const TwitterCard: React.FC<TwitterCardProps> = ({
  className,
  tweet,
}) => {
  return (
    <div className="w-full flex items-center justify-center border-b p-5">
      <div className="w-full">
        <div className="flex justify-between">
          <div className="flex items-center">
            <img
              className="h-11 w-11 rounded-full"
              src={tweet.author.image || ""}
            />
            <div className="ml-1.5 text-sm flex gap-x-2 items-center leading-tight">
              <span className="text-black dark:text-white font-bold block ">
                {tweet.author.name}
              </span>
              <span className="text-gray-100 font-extralight block">
                @{tweet.author.username}
              </span>
              <span>
                Hace{" "}
                {Math.floor(
                  (Date.now() - tweet.createdAt.getTime()) / 1000 / 60,
                )}{" "}
                minutos
              </span>
            </div>
          </div>
          <TagIcon name="moreoptions" className="h-4 w-4" />
        </div>
        <p className="block text-xl leading-snug mt-3">{tweet.description}</p>
        {tweet.mediaUrl && (
          <div className="w-full p-5 max-w-full h-auto rounded-xl">
            <img
              className="w-full h-auto max-h-[550px] object-cover rounded-xl"
              src={tweet.mediaUrl || "https://picsum.photos/200"}
            />
          </div>
        )}
        <div className="my-1"></div>
        <div className="flex mt-3 justify-between">
          <div className="flex items-center mr-6">
            <svg className="fill-current h-3 w-3" viewBox="0 0 24 24">
              <g>
                <path d="M14.046 2.242l-4.148-.01h-.002c-4.374 0-7.8 3.427-7.8 7.802 0 4.098 3.186 7.206 7.465 7.37v3.828c0 .108.044.286.12.403.142.225.384.347.632.347.138 0 .277-.038.402-.118.264-.168 6.473-4.14 8.088-5.506 1.902-1.61 3.04-3.97 3.043-6.312v-.017c-.006-4.367-3.43-7.787-7.8-7.788zm3.787 12.972c-1.134.96-4.862 3.405-6.772 4.643V16.67c0-.414-.335-.75-.75-.75h-.396c-3.66 0-6.318-2.476-6.318-5.886 0-3.534 2.768-6.302 6.3-6.302l4.147.01h.002c3.532 0 6.3 2.766 6.302 6.296-.003 1.91-.942 3.844-2.514 5.176z"></path>
              </g>
            </svg>
            <span className="ml-1 text-sm">{tweet.replies.length}</span>
          </div>
          <div className="flex items-center mr-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="fill-current h-3 w-3"
              viewBox="0 0 1024 1024"
            >
              <path
                fill="currentColor"
                d="M136 552h63.6c4.4 0 8-3.6 8-8V288.7h528.6v72.6c0 1.9.6 3.7 1.8 5.2a8.3 8.3 0 0 0 11.7 1.4L893 255.4c4.3-5 3.6-10.3 0-13.2L749.7 129.8a8.22 8.22 0 0 0-5.2-1.8c-4.6 0-8.4 3.8-8.4 8.4V209H199.7c-39.5 0-71.7 32.2-71.7 71.8V544c0 4.4 3.6 8 8 8m752-80h-63.6c-4.4 0-8 3.6-8 8v255.3H287.8v-72.6c0-1.9-.6-3.7-1.8-5.2a8.3 8.3 0 0 0-11.7-1.4L131 768.6c-4.3 5-3.6 10.3 0 13.2l143.3 112.4c1.5 1.2 3.3 1.8 5.2 1.8c4.6 0 8.4-3.8 8.4-8.4V815h536.6c39.5 0 71.7-32.2 71.7-71.8V480c-.2-4.4-3.8-8-8.2-8"
              />
            </svg>
            <span className="ml-1 text-sm">{tweet.retweets}</span>
          </div>

          <div className="flex items-center mr-6">
            <svg className="fill-current h-3 w-3" viewBox="0 0 24 24">
              <g>
                <path d="M12 21.638h-.014C9.403 21.59 1.95 14.856 1.95 8.478c0-3.064 2.525-5.754 5.403-5.754 2.29 0 3.83 1.58 4.646 2.73.814-1.148 2.354-2.73 4.645-2.73 2.88 0 5.404 2.69 5.404 5.755 0 6.376-7.454 13.11-10.037 13.157H12zM7.354 4.225c-2.08 0-3.903 1.988-3.903 4.255 0 5.74 7.034 11.596 8.55 11.658 1.518-.062 8.55-5.917 8.55-11.658 0-2.267-1.823-4.255-3.903-4.255-2.528 0-3.94 2.936-3.952 2.965-.23.562-1.156.562-1.387 0-.014-.03-1.425-2.965-3.954-2.965z"></path>
              </g>
            </svg>
            <span className="ml-1 text-sm">{tweet.likes}</span>
          </div>

          <div className="flex items-center mr-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="fill-current h-3 w-3"
              viewBox="0 0 22 22"
            >
              <path
                fill="currentColor"
                d="M7 18H4V8h3m5 10H9V4h3m5 14h-3v-7h3Z"
              />
            </svg>
            <span className="ml-1 text-sm">{tweet.plays}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
