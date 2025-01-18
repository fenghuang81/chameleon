import type { GadgetModel } from "gadget-server";

// This file describes the schema for the "scan" model, go to https://chameleon.gadget.app/edit to view/edit your model in Gadget
// For more information on how to update this file http://docs.gadget.dev

export const schema: GadgetModel = {
  type: "gadget/model-schema/v1",
  storageKey: "8uEtU3OpGnMm",
  fields: {
    image: {
      type: "file",
      allowPublicAccess: false,
      storageKey: "ccUTwouULk3m",
    },
    results: { type: "json", storageKey: "5d0YY5gWGX0k" },
  },
};
