type TRegistrationForm = "pin1" | "pin2" | "username";

export type TRegistrationFields = {
  [key in TRegistrationForm]: string;
};

export type TRegistrationErrors = {
  [key in TRegistrationForm]: boolean;
};

export interface TRegistrationItem extends Partial<HTMLInputElement> {
  error: string;
  name: TRegistrationForm;
}
