import React, { useEffect, useState } from "react";
import { useFetcher } from "react-router";

import { Button, Input, Spinner } from "@/ui";

import { registrationItems } from "./data";

import {
  errorClass,
  itemClass,
  layoutClass,
  loaderWrapperClass,
  logoClass,
  logoHolderClass,
  submitClass,
  wrapperClass,
} from "./RegistrationPage.css";

import type {
  TRegistrationFields,
  TRegistrationErrors,
  TRegistrationItem,
} from "./RegistrationPage.types";

const RegistrationPage: React.FC = () => {
  const { data: submitResponse, Form, state } = useFetcher();
  const [values, setValues] = useState<TRegistrationFields>({
    pin1: "",
    pin2: "",
    username: "",
  });
  const [errors, setErrors] = useState<TRegistrationErrors>({
    pin1: false,
    pin2: false,
    username: false,
  });

  const checkPin = (): void => {
    const { pin1, pin2 } = values;

    if ((pin1.length || pin2.length) && pin1 !== pin2) {
      setErrors(
        (prevErrors: TRegistrationErrors): TRegistrationErrors => ({
          ...prevErrors,
          pin1: true,
          pin2: true,
        }),
      );

      return;
    }

    setErrors(
      (prevErrors: TRegistrationErrors): TRegistrationErrors => ({
        ...prevErrors,
        pin1: false,
        pin2: false,
      }),
    );
  };

  const checkErrors = (): void => {
    if (submitResponse) {
      setErrors(submitResponse);

      return;
    }
  };

  const handleInputChange = ({ currentTarget }: React.SyntheticEvent<HTMLInputElement>): void => {
    const { name, value } = currentTarget;

    setErrors(
      (prevErrors: TRegistrationErrors): TRegistrationErrors => ({
        ...prevErrors,
        [name]: false,
      }),
    );

    setValues(
      (prevFields: TRegistrationFields): TRegistrationFields => ({
        ...prevFields,
        [name]: value,
      }),
    );
  };

  useEffect((): void => {
    checkPin();
  }, [values]);

  useEffect((): void => {
    checkErrors();
  }, [submitResponse]);

  return (
    <div className={wrapperClass}>
      <div className={layoutClass}>
        <div className={logoHolderClass}>
          <img
            alt="Logo image."
            className={logoClass}
            src="images/logo_img.png"
          />
        </div>

        <Form
          autoComplete="off"
          method="post"
        >
          {registrationItems &&
            !!registrationItems.length &&
            registrationItems.map<React.ReactElement>(
              ({ error, id, name, placeholder, type }: TRegistrationItem) => (
                <div
                  className={itemClass}
                  key={`${id}-registration-item`}
                >
                  <Input
                    {...{ name, placeholder, type }}
                    onChange={handleInputChange}
                    template="primary"
                    value={values[name]}
                  />

                  {errors[name] && <p className={errorClass}>{error}</p>}
                </div>
              ),
            )}

          {state === "submitting" ? (
            <div className={loaderWrapperClass}>
              <Spinner />
            </div>
          ) : (
            <div className={submitClass}>
              <Button
                size="large"
                template="primary"
                type="submit"
              >
                register
              </Button>
            </div>
          )}
        </Form>
      </div>
    </div>
  );
};

export { RegistrationPage };
