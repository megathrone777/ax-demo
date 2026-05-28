type TLoginForm = "password" | "username";

export type TLoginFields = {
  [key in TLoginForm]: string;
};

export type TLoginErrors = {
  [key in TLoginForm]: boolean;
};

export interface TLoginItem extends Partial<HTMLInputElement> {
  error: string;
  name: TLoginForm;
}
