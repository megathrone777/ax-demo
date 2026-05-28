import type { TRegistrationItem } from "./RegistrationPage.types";

export const registrationItems: TRegistrationItem[] = [
  {
    error: "Username is not valid",
    id: "registration-input-1",
    name: "username",
    placeholder: "Username",
    type: "text",
  },
  {
    error: "Passwords must be equal",
    id: "registration-input-2",
    name: "pin1",
    placeholder: "Password",
    type: "password",
  },
  {
    error: "Passwords must be equal",
    id: "registration-input-3",
    name: "pin2",
    placeholder: "Password repeat",
    type: "password",
  },
];
