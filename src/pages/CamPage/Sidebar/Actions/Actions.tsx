import React, { useCallback, useState } from "react";

import { Button } from "@/ui";

import { actionClass, wrapperClass, titleClass, layoutClass } from "./Actions.css";

import type { TProps } from "./types";

const Actions: React.FC<TProps> = ({ list, title }) => {
  const [currentAction, setCurrentAction] = useState<string>("");

  const handleClick = useCallback(
    ({ currentTarget }: React.SyntheticEvent<HTMLButtonElement>): void => {
      const action = currentTarget.id;

      setCurrentAction(action);
    },
    [list],
  );

  return (
    <div className={wrapperClass}>
      <p className={titleClass}>{title}</p>

      {list && !!list.length && (
        <div className={layoutClass}>
          {list.map<React.ReactElement>((action: string) => (
            <div
              className={actionClass}
              key={`${action}-action`}
            >
              <Button
                id={action}
                isActive={currentAction === action}
                onClick={handleClick}
                size="small"
                template="secondary"
                type="button"
              >
                {action}
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export { Actions };
