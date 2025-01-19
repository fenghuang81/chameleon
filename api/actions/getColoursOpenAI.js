import { useOpenAIGlobalActionContext } from "gadget-server";
// define params
export const params = {
  numColours: { type: "number" },
  image: { type: "string" },
};
/** @type { ActionRun } */
export const run = async ({ connections, params }) => {
  const { numColours, image } = params;
  const systemMessage = `You will be given an image, please select ${numColours} colours that best represent the image from the image and place the hex codes in a JSON array structure like this: {"colors":["hex","hex",...]}. Try to pick colours that are different from each other and complement each other nicely`;
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
            image_url: {"url": image}
          }
        ]
      }],
    response_format: { type: "json_object" },
  });
  const hexColors = JSON.parse(response.choices[0].message.content);
  return { hexColors };
};
