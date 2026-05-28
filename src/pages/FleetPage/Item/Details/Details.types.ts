export interface TPositionItem {
  label: string;
  value: string;
}

export type TProps = Pick<TVehicle, "id" | "position">;
