import { useContext } from "react";

import { AppContext } from "@/store";

import type { TUseStore } from "./types";

const useStore: TUseStore = () => {
  const { dispatch, store } = useContext(AppContext);

  return {
    dispatch,
    store,
  };
};

export { useStore };
