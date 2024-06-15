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
       Eres un asistente útil.
       Sugiere tweets basados en el mensaje del usuario.
       Si no puede responder, responda con "No sé Wacho soy Kuka"."
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
