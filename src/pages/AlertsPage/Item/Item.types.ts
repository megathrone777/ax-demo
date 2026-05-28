type TAlertType = "destination" | "person";

export interface TAlert {
  description: string;
  time: string;
  type: TAlertType;
}

export type TProps = TAlert;
