import type { TLoginItem } from "./LoginPage.types";

export const loginItems: TLoginItem[] = [
  {
    error: "Username is not valid",
    id: "login-input-1",
    name: "username",
    placeholder: "Username",
    type: "text",
  },
  {
    error: "Password is not valid",
    id: "login-input-2",
    name: "password",
    placeholder: "Password",
    type: "password",
  },
];
