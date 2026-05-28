import React, { useReducer, createContext } from "react";

import { initialStore } from "./initialStore";
import { reducer } from "./reducer";

import type { TContext } from "./types";

const AppContext = createContext<TContext>({
  dispatch: (): null => null,
  store: initialStore,
});

const AppProvider: React.FC<{
  children: React.ReactElement;
}> = ({ children }) => {
  const [store, dispatch] = useReducer(reducer, initialStore);

  console.log(store.currentIP);

  return <AppContext value={{ dispatch, store }}>{children}</AppContext>;
};

export { AppContext, AppProvider };
