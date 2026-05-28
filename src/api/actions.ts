import { redirect } from "react-router-dom";

import type { TLoginErrors } from "@/pages/LoginPage/LoginPage.types";
import type { TRegistrationErrors } from "@/pages/RegistrationPage/RegistrationPage.types";

import type { ActionFunction } from "react-router-dom";

export const registrationAction: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const username = formData.get("username");
  const pin1 = formData.get("pin1");
  const pin2 = formData.get("pin2");

  const errors: TRegistrationErrors = {
    pin1: false,
    pin2: false,
    username: false,
  };

  if (typeof username !== "string" || username.length === 0) {
    errors["username"] = true;
  }

  if (typeof pin1 !== "string" || pin1.length === 0) {
    errors["pin1"] = true;
  }

  if (typeof pin2 !== "string" || pin2.length === 0) {
    errors["pin2"] = true;
  }

  if (errors["username"] || errors["pin1"] || errors["pin2"]) {
    return errors;
  }

  return redirect("/login");
};

export const loginAction: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const username = formData.get("username");
  const password = formData.get("password");

  const errors: TLoginErrors = {
    password: false,
    username: false,
  };

  if (typeof username !== "string" || username !== "qwerty") {
    errors.username = true;
  }

  if (typeof password !== "string" || password !== "123456") {
    errors.password = true;
  }

  if (errors.username || errors.password) {
    return errors;
  }

  localStorage.setItem("username", `${username}`);

  return redirect("/map/1");
};
