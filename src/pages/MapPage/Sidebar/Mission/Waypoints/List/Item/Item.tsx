import React, { useState } from "react";
import { createPortal } from "react-dom";

import { Modal } from "@/components";
import { useDestinations, useStore } from "@/hooks";
import { deleteDestination } from "@/store";
import { Icon } from "@/ui";

import { Edit } from "./Edit";
import { Save } from "./Save";

import { iconClass, buttonClass, contentClass, optionsClass } from "./Item.css";

import type { TProps, TModals } from "./Item.types";

const Item: React.FC<TProps> = ({ index, latitude, longitude }) => {
  const { id, positions } = useDestinations();
  const [modalsView, toggleModalsView] = useState<TModals>({
    edit: false,
    save: false,
  });
  const { dispatch } = useStore();

  const handleModalOpen = ({ currentTarget }: React.SyntheticEvent<HTMLButtonElement>): void => {
    toggleModalsView((prevModals: TModals) => ({
      ...prevModals,
      [currentTarget.id]: true,
    }));
  };

  const handleModalClose = (): void => {
    toggleModalsView({
      edit: false,
      save: false,
    });
  };

  const handleDeleteDestination = (): void => {
    dispatch(
      deleteDestination({
        id,
        index,
      }),
    );
  };

  return (
    <>
      <Icon
        className={iconClass}
        id="drag"
      />

      <div className={contentClass}>
        {positions[index] && positions[index].properties.name.length > 0 ? (
          <span>{positions[index].properties.name}</span>
        ) : (
          <>
            <span>{latitude.toFixed(4)}</span> - <span>{longitude.toFixed(4)}</span>
          </>
        )}
      </div>

      <div className={optionsClass}>
        <button
          className={buttonClass}
          id="save"
          onClick={handleModalOpen}
          type="button"
        >
          <Icon id="save" />
        </button>

        <button
          className={buttonClass}
          id="edit"
          onClick={handleModalOpen}
          type="button"
        >
          <Icon id="edit" />
        </button>

        <button
          className={buttonClass}
          onClick={handleDeleteDestination}
          type="button"
        >
          <Icon id="trash" />
        </button>
      </div>

      {modalsView.edit &&
        createPortal(
          <Modal onClose={handleModalClose}>
            <Edit {...{ index }} />
          </Modal>,
          document.body,
        )}

      {modalsView.save &&
        createPortal(
          <Modal onClose={handleModalClose}>
            <Save
              {...{ index }}
              onSave={handleModalClose}
            />
          </Modal>,
          document.body,
        )}
    </>
  );
};

export { Item };
