import { useOpenAIGlobalActionContext } from "gadget-server";

/** @type { ActionRun } */
export const run = async ({ connections, parameters }) => {
  const { numColours, imageLink } = parameters;
  const systemMessage = `You will be given an image, please select ${numColours} colours from the image and place the hex codes in a JSON array structure like this: {"colors":["hex","hex",...]}`;
  const response = await connections.openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system", content: systemMessage
      },
      {
        role: "user", content: [
          {
            type: "image_url",
            image_url: { "url": imageLink }
          }
        ]
      }],
    response_format: { type: "json_object" },
  });
  const hexColors = JSON.parse(response.choices[0].message.content);
  return { hexColors };
};
