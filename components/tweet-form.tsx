"use client";
import { toast } from "sonner";
import { type CoreMessage } from "ai";
import { useEffect, useRef, useState, useTransition } from "react";
import { continueConversation } from "@/actions/continue-conversation";
import { readStreamableValue } from "ai/rsc";
import { cn } from "@/lib/utils";
import { Button } from "@ui/button";
import { Textarea } from "@ui/textarea";
import { createTweet, type TweetFormValues } from "@/actions/create-tweet";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TweetSchema } from "@/schemas";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { UserExtend } from "@/data/user";

type Props = {
  currentUser?: UserExtend | null;
};

// Force the page to be dynamic and allow streaming responses up to 30 seconds
export const dynamic = "force-dynamic";
export const maxDuration = 30;

interface TweetSuggestion {
  content?: string[];
  mediaUrl?: {
    url: string;
  };
}

export default function TweetForm({ currentUser }: Props) {
  const [messages, setMessages] = useState<CoreMessage[]>([]);
  const [tweetSuggestion, setTweetSuggestion] = useState<TweetSuggestion>({});
  const [showSuggestions, setShowSuggestions] = useState(false);

  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<TweetFormValues>({
    defaultValues: {
      description: "",
      mediaUrl: [],
    },
    resolver: zodResolver(TweetSchema),
  });

  const extraerTweets = (texto: string) => {
    // Divide el texto en partes usando la expresión regular para detectar "Tweet N:"
    const partes = texto.split(/Tweet \d+:/);

    // Filtra las partes no vacías y elimina espacios en blanco al inicio y al final de cada parte
    const tweets = partes
      .filter((parte) => parte.trim() !== "")
      .map((parte) => parte.trim());

    return tweets;
  };

  const handleShowSuggestions = () => {
    setShowSuggestions(!showSuggestions);
  };

  const extraerUrl = (texto: string) => {
    // Utilizar una expresión regular para encontrar la URL después de 'url=' y antes de un espacio
    const regex = /url=([^ ]+)/;
    const match = texto.match(regex);

    if (match) {
      // Obtener la URL encontrada después de 'url='
      const url = match[1];
      return url;
    } else {
      return "";
    }
  };

  const handleSuggestionTweet = async () => {
    const suggestion = form.getValues("description") || ("" as string);

    const newMessages: CoreMessage[] = [
      ...messages,
      { content: suggestion, role: "user" },
    ];

    setMessages(newMessages);

    const result = await continueConversation(newMessages);

    for await (const content of readStreamableValue(result.message as any)) {
      setMessages([
        ...newMessages,
        {
          role: "assistant",
          content: content as string,
        },
      ]);

      const tweets = extraerTweets(content as string);
      const mediaUrl = extraerUrl(content as string);

      const suggestionTweet = {
        content: tweets,
        mediaUrl: mediaUrl ? { url: mediaUrl } : undefined,
      };

      if (tweets.length > 0) {
        setTweetSuggestion(suggestionTweet);
      }
    }
  };

  const handleSelectTweet = (index: number) => {
    const tweet = tweetSuggestion.content![index];
    const oldTweet = form.getValues("description");
    const oldMediaUrl = form.getValues("mediaUrl");
    form.setValue("description", oldTweet ? `${oldTweet} ${tweet}` : tweet);

    if (tweetSuggestion.mediaUrl) {
      form.setValue(
        "mediaUrl",
        oldMediaUrl
          ? [
              ...oldMediaUrl,
              {
                url: tweetSuggestion.mediaUrl.url,
              },
            ]
          : [
              {
                url: tweetSuggestion.mediaUrl.url,
              },
            ],
      );
    }
    setShowSuggestions(false);
  };

  function onSubmit(values: TweetFormValues) {
    setError("");
    setSuccess("");

    startTransition(() => {
      createTweet(values)
        .then((res) => {
          if (res.error) {
            setError(res.error);
            toast(res.error);
          }
          if (res.success) {
            setSuccess(res.success);
            toast(res.success);
          }
        })
        .finally(() => {
          form.reset();
        });
    });
  }

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Verificar si las teclas Control y Enter están siendo presionadas
      if (event.ctrlKey && event.key === "Enter") {
        onSubmit(form.getValues());
      }
    };

    // Agregar el event listener
    window.addEventListener("keydown", handleKeyDown);

    // Limpiar el event listener cuando el componente se desmonta
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <section className="p-3 border-b">
      <div className="flex items-start gap-x-2 ">
        <img className="h-10 w-10 rounded-full" src={currentUser?.image!} />
        <div className="flex flex-col gap-y-5 items-start w-full">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full flex flex-col gap-y-4"
            >
              <div className="w-full flex flex-col gap-y-5">
                <div>
                  <Button
                    size="sm"
                    className="text-xs rounded-xl text-sky-600"
                    variant="outline"
                  >
                    Todos
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 fill-sky-600"
                      viewBox="0 0 9 16"
                    >
                      <path d="M4.5 13c-.28 0-.5-.22-.5-.5v-9c0-.28.22-.5.5-.5s.5.22.5.5v9c0 .28-.22.5-.5.5" />
                      <path d="M4.5 14a.47.47 0 0 1-.35-.15l-3.5-3.5c-.2-.2-.2-.51 0-.71s.51-.2.71 0l3.15 3.15l3.15-3.15c.2-.2.51-.2.71 0s.2.51 0 .71l-3.5 3.5c-.1.1-.23.15-.35.15Z" />
                    </svg>
                  </Button>
                </div>
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          {...field}
                          disabled={isPending}
                          placeholder="¡¿Que estas pensando?!"
                          className="border-none text-xl focus-visible:ring-0 resize-none"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {tweetSuggestion.content &&
                showSuggestions &&
                tweetSuggestion.content?.length > 0 && (
                  <ul className="flex flex-col gap-y-2 w-full">
                    {tweetSuggestion.content?.map((t, index) => {
                      const { content, mediaUrl } = tweetSuggestion;
                      if (!content) {
                        return null;
                      }
                      return (
                        <li
                          key={t}
                          className={cn(
                            "text-gray-400 font-light cursor-pointer hover:bg-sky-600/60 hover:text-white hover:rounded-md p-2",
                            index !== content.length - 1 && "border-b pb-2",
                          )}
                          onClick={() => handleSelectTweet(index)}
                        >
                          {t}
                          {mediaUrl && (
                            <img
                              src={mediaUrl.url}
                              alt={t}
                              className="w-10 h-10 object-cover"
                            />
                          )}
                        </li>
                      );
                    })}
                  </ul>
                )}
              <section className="w-full flex gap-x-3 items-center">
                <Button
                  className="bg-sky-600 hover:bg-sky-700 text-white font-bold"
                  type="button"
                  onClick={handleSuggestionTweet}
                >
                  Sugerir tweet con IA
                </Button>
                {tweetSuggestion.content &&
                  tweetSuggestion.content.length > 0 && (
                    <Button
                      className="bg-sky-600 hover:bg-sky-700 text-white font-bold"
                      onClick={handleShowSuggestions}
                      type="button"
                    >
                      Sugerencias
                    </Button>
                  )}
              </section>
              <span className="text-xs text-sky-600">
                🌐 Cualquier persona puede responder
              </span>
              <section className="flex items-center justify-between border-t pt-2 w-full">
                <div className="flex items-center gap-x-2 text-sky-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 fill-sky-600"
                    viewBox="0 0 256 256"
                  >
                    <path d="M216 44H40a12 12 0 0 0-12 12v144a12 12 0 0 0 12 12h176a12 12 0 0 0 12-12V56a12 12 0 0 0-12-12M40 52h176a4 4 0 0 1 4 4v112.4l-32.89-32.89a12 12 0 0 0-17 0l-22.83 22.83l-46.82-46.83a12 12 0 0 0-17 0L36 159V56a4 4 0 0 1 4-4m-4 148v-29.66l53.17-53.17a4 4 0 0 1 5.66 0L181.66 204H40a4 4 0 0 1-4-4m180 4h-23l-40-40l22.83-22.83a4 4 0 0 1 5.66 0L220 179.71V200a4 4 0 0 1-4 4m-68-104a8 8 0 1 1 8 8a8 8 0 0 1-8-8" />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 fill-sky-600"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8.5 13.885h1q.367 0 .626-.259t.259-.626v-.884h-.77V13q0 .039-.038.077t-.077.039h-1q-.039 0-.077-.039T8.384 13v-2q0-.039.03-.077q.028-.039.067-.039h1.884q-.038-.328-.278-.549q-.239-.22-.587-.22h-1q-.367 0-.626.259T7.615 11v2q0 .367.259.626q.259.258.626.258m3.115 0h.77v-3.768h-.77zm2 0h.77v-1.5h1.5v-.769h-1.5v-.73h2v-.77h-2.77zm-8 6.116q-.69 0-1.152-.462T4 18.384V5.616q0-.691.463-1.153T5.616 4h12.769q.69 0 1.153.463T20 5.616v12.769q0 .69-.462 1.153T18.384 20zm0-1h12.77q.23 0 .423-.192t.192-.424V5.616q0-.231-.192-.424T18.384 5H5.616q-.231 0-.424.192T5 5.616v12.769q0 .23.192.423t.423.192M5 5v14z" />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 fill-sky-600"
                    viewBox="0 0 48 48"
                  >
                    <path d="M5.25 15.5h19.875a6.252 6.252 0 0 0 12.25 0h5.375a1.25 1.25 0 1 0 0-2.5h-5.375a6.252 6.252 0 0 0-12.25 0H5.25a1.25 1.25 0 1 0 0 2.5m26-5a3.75 3.75 0 1 1 0 7.5a3.75 3.75 0 0 1 0-7.5m-26 24h5.625a6.252 6.252 0 0 0 12.25 0H42.75a1.25 1.25 0 1 0 0-2.5H23.125a6.252 6.252 0 0 0-12.25 0H5.25a1.25 1.25 0 1 0 0 2.5m11.75-5a3.75 3.75 0 1 1 0 7.5a3.75 3.75 0 0 1 0-7.5" />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 fill-sky-600"
                    viewBox="0 0 24 24"
                  >
                    <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2M8.5 8c.83 0 1.5.67 1.5 1.5S9.33 11 8.5 11S7 10.33 7 9.5S7.67 8 8.5 8M12 18c-2.28 0-4.22-1.66-5-4h10c-.78 2.34-2.72 4-5 4m3.5-7c-.83 0-1.5-.67-1.5-1.5S14.67 8 15.5 8s1.5.67 1.5 1.5s-.67 1.5-1.5 1.5" />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 fill-sky-600"
                    viewBox="0 0 24 24"
                  >
                    <path d="M5 8h14V6H5zm0 0V6zm0 14q-.825 0-1.412-.587T3 20V6q0-.825.588-1.412T5 4h1V3q0-.425.288-.712T7 2t.713.288T8 3v1h8V3q0-.425.288-.712T17 2t.713.288T18 3v1h1q.825 0 1.413.588T21 6v4.675q0 .425-.288.713t-.712.287t-.712-.288t-.288-.712V10H5v10h5.8q.425 0 .713.288T11.8 21t-.288.713T10.8 22zm13 1q-2.075 0-3.537-1.463T13 18t1.463-3.537T18 13t3.538 1.463T23 18t-1.463 3.538T18 23m.5-5.2v-2.3q0-.2-.15-.35T18 15t-.35.15t-.15.35v2.275q0 .2.075.388t.225.337l1.525 1.525q.15.15.35.15t.35-.15t.15-.35t-.15-.35z" />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 fill-sky-600"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 20.556q-.235 0-.47-.077t-.432-.25q-1.067-.981-2.164-2.185q-1.096-1.203-1.99-2.493t-1.468-2.633t-.572-2.622q0-3.173 2.066-5.234Q9.037 3 12 3t5.03 2.062q2.066 2.061 2.066 5.234q0 1.279-.572 2.613q-.572 1.333-1.458 2.632q-.885 1.3-1.981 2.494T12.92 20.21q-.191.173-.434.26q-.244.086-.487.086m.004-8.825q.667 0 1.14-.476q.472-.475.472-1.143t-.476-1.14t-1.143-.472t-1.14.476t-.472 1.143t.475 1.14t1.144.472" />
                  </svg>
                </div>
                <Button
                  type="submit"
                  className="bg-sky-600 border-2"
                  disabled={isPending}
                >
                  Postear
                </Button>
              </section>
            </form>
          </Form>
        </div>
      </div>
    </section>
  );
}
