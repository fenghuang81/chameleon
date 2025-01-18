import {useOpenAIGlobalActionContext} from "gadget-server";

/** @type { ActionRun } */
export const run = async ({params, logger, api,connections,scope}) => {
  const response = await connections.openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {role: "system",content: `You will be given an image, please select 5 colours from the image and place the hex codes in a JSON array structure like this: {"colours":["hex","hex",...]}`
      },
      {role: "user", content: [
        {type: "image_url",
              image_url: {"url":"https://images.unsplash.com/photo-1519501025264-65ba15a82390?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
          }
        ]
      }],
    response_format: {type: "json_object"},
  });
  const message = {message: response.choices[0].message.content};
  const json_output = message.message;
  return {json_output};
};
