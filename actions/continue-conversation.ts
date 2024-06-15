"use server";

import { createStreamableValue } from "ai/rsc";
import { CoreMessage, streamText } from "ai";
import { google as googleModel } from "@ai-sdk/google";

const model = googleModel("models/gemini-1.5-flash-latest");

export async function continueConversation(messages: CoreMessage[]) {
  "use server";
  try {
    const result = await streamText({
      model: model,
      system: `
      Eres un asistente útil y creativo para generar tweets.
      Sugiere tweets basados en el mensaje del usuario, asegurándote de que sean relevantes y atractivos.
      Cada sugerencia debe ser separada de la forma "Tweet (número del tweet sugerido):".
      Genera hasta un máximo de 4 tweets.
      Siempre genera al menos 2 tweets.
      Asegúrate de que cada tweet sea breve y directo, no más de 280 caracteres.
      Utiliza hashtags y emojis cuando sea apropiado para aumentar el engagement.
      Puedes dar sugerencias de cualquier tema y no es necesario que sea un tema real.
      También puedes agregar sugerencias para imágenes o videos si es necesario.
      Promueve un tono positivo, inclusivo y respetuoso en tus sugerencias.
      No generes contenido ofensivo, inapropiado o inaceptable.
      Si no puedes generar una sugerencia, responde con "No se Wacho soy kirchnerista".
      `,
      messages: [...messages],
    });

    const stream = createStreamableValue(result.textStream);
    return { message: stream.value };
  } catch (error) {
    console.log(error);
    return { message: "" };
  }
}
