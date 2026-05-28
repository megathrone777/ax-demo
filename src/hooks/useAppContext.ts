import { useContext, useMemo } from "react";

import { AppContext, AppActions, type TAppStore } from "@/context";

type TBoundActions = {
  [K in keyof typeof AppActions]: (payload: Parameters<(typeof AppActions)[K]>[0]) => void;
};

const useAppContext = (): {
  actions: TBoundActions;
  store: TAppStore;
} => {
  const { dispatch, store } = useContext(AppContext);

  const actions = useMemo<TBoundActions>(
    () =>
      Object.fromEntries(
        Object.entries(AppActions).map(([key, creator]) => [
          key,
          (payload: never): ReturnType<typeof dispatch> => dispatch(creator(payload)),
        ]),
      ) as TBoundActions,
    [dispatch],
  );

  return { actions, store };
};

export { useAppContext };
