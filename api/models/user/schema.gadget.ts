import type { GadgetModel } from "gadget-server";

// This file describes the schema for the "user" model, go to https://chameleon.gadget.app/edit to view/edit your model in Gadget
// For more information on how to update this file http://docs.gadget.dev

export const schema: GadgetModel = {
  type: "gadget/model-schema/v1",
  storageKey: "bp4IRguCSXur",
  fields: {
    email: {
      type: "email",
      validations: { required: true, unique: true },
      storageKey: "TDoXbpcx6Ni7",
    },
    emailVerificationToken: {
      type: "string",
      storageKey: "SVllOPD-kLVx",
    },
    emailVerificationTokenExpiration: {
      type: "dateTime",
      includeTime: true,
      storageKey: "6E8WhmOReALu",
    },
    emailVerified: {
      type: "boolean",
      default: false,
      storageKey: "-lV_txoUlshL",
    },
    firstName: { type: "string", storageKey: "NqSZbAmq0pdI" },
    googleImageUrl: { type: "url", storageKey: "HHsIoz6p_ncl" },
    googleProfileId: { type: "string", storageKey: "RcbokjyUzUx4" },
    lastName: { type: "string", storageKey: "buQq3tNPoThj" },
    lastSignedIn: {
      type: "dateTime",
      includeTime: true,
      storageKey: "uE9sqBDooKiP",
    },
    password: {
      type: "password",
      validations: { strongPassword: true },
      storageKey: "pqJgfwh8Dmvk",
    },
    resetPasswordToken: {
      type: "string",
      storageKey: "8DXTcdCTLeqD",
    },
    resetPasswordTokenExpiration: {
      type: "dateTime",
      includeTime: true,
      storageKey: "xUJ2Nh6fn_1p",
    },
    roles: {
      type: "roleList",
      default: ["unauthenticated"],
      storageKey: "hiUzHYMjFooz",
    },
  },
};
