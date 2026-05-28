import React, { useEffect, useState } from "react";
import { useFetcher } from "react-router-dom";

import { Button, Input, Spinner } from "@/ui";

import { loginItems } from "./data";

import {
  errorClass,
  itemClass,
  layoutClass,
  loaderWrapperClass,
  logoClass,
  logoHolderClass,
  submitClass,
  wrapperClass,
} from "./LoginPage.css";

import type { TLoginErrors, TLoginFields, TLoginItem } from "./LoginPage.types";

const LoginPage: React.FC = () => {
  const { data: submitResponse, Form, state } = useFetcher();
  const [values, setValues] = useState<TLoginFields>({
    password: "",
    username: "",
  });
  const [errors, setErrors] = useState<TLoginErrors>({
    password: false,
    username: false,
  });

  const checkErrors = (): void => {
    if (submitResponse) {
      setErrors(submitResponse);

      return;
    }
  };

  const handleInputChange = ({ currentTarget }: React.SyntheticEvent<HTMLInputElement>): void => {
    const { name, value } = currentTarget;

    setErrors(
      (prevErrors: TLoginErrors): TLoginErrors => ({
        ...prevErrors,
        [name]: false,
      }),
    );

    setValues(
      (prevFields: TLoginFields): TLoginFields => ({
        ...prevFields,
        [name]: value,
      }),
    );
  };

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
          {loginItems &&
            !!loginItems.length &&
            loginItems.map<React.ReactElement>(
              ({ error, id, name, placeholder, type }: TLoginItem) => (
                <div
                  className={itemClass}
                  key={`${id}-login-item`}
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
                sign in
              </Button>
            </div>
          )}
        </Form>
      </div>
    </div>
  );
};

export { LoginPage };
