"use client";

import { type CoreMessage } from "ai";
import { useState } from "react";
import { continueConversation } from "@/actions/continue-conversation";
import { readStreamableValue } from "ai/rsc";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { TwitterCard } from "@/components/twitter-card";
import { Card, CardContent } from "@/components/ui/card";

// Force the page to be dynamic and allow streaming responses up to 30 seconds
export const dynamic = "force-dynamic";
export const maxDuration = 30;

export default function Chat() {
  const [messages, setMessages] = useState<CoreMessage[]>([]);
  const [input, setInput] = useState("");

  return (
    <div className="flex flex-col w-full max-w-md py-24 mx-auto justify-between stretch h-full">
      {messages.map((m, i) => (
        <div key={i} className="whitespace-pre-wrap break-words flex flex-col">
          <span
            className={cn(
              "text-violet-500",
              m.role === "user" ? "text-right" : "text-left",
            )}
          >
            {m.role === "user" ? "User: " : "AI: "}
          </span>
          <div className="p-5">
            {m.role !== "user" ? (
              <Card className={cn("text-right")}>
                <CardContent>{m.content as string}</CardContent>
              </Card>
            ) : (
              <p className="text-left">{m.content as string}</p>
            )}
          </div>
        </div>
      ))}

      <form
        action={async () => {
          const newMessages: CoreMessage[] = [
            ...messages,
            { content: input, role: "user" },
          ];

          setMessages(newMessages);
          setInput("");

          const result = await continueConversation(newMessages);

          for await (const content of readStreamableValue(
            result.message as any,
          )) {
            setMessages([
              ...newMessages,
              {
                role: "assistant",
                content: content as string,
              },
            ]);
            window.scrollTo(0, window.visualViewport?.height || 0);
          }
        }}
      >
        <Input
          className="w-full max-w-md p-2 mb-8 border border-gray-300 rounded shadow-xl"
          value={input}
          placeholder="Say something..."
          onChange={(e) => setInput(e.target.value)}
        />
      </form>
    </div>
  );
}
