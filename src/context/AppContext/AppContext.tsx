import React, { useReducer, createContext } from "react";

import { AppReducer } from "./AppReducer";
import { AppStore } from "./AppStore";

import type { TAppContext } from "./App.types";

const AppContext = createContext<TAppContext>({
  dispatch: (): null => null,
  store: AppStore,
});

const AppProvider: React.FC<{
  children: React.ReactElement;
}> = ({ children }) => {
  const [store, dispatch] = useReducer(AppReducer, AppStore);

  return <AppContext value={{ dispatch, store }}>{children}</AppContext>;
};

export { AppContext, AppProvider };
