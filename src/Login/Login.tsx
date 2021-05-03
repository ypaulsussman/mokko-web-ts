import React, { FormEvent, useState, FC } from "react";
import { Link, useHistory } from "react-router-dom";
import {
  Alert, Button, Form, Fieldset, GridContainer,
  Header, Label, PrimaryNav, TextInput
} from "@trussworks/react-uswds";
import { API_URL } from "../constants";
import { getData } from "../utils";

type LoginProps = {
  setIsLoggedIn: (isLoggedIn: boolean) => void
}

const Login: FC<LoginProps> = ({ setIsLoggedIn }) => {
  const [failedLogin, setFailedLogin] = useState("");
  const history = useHistory();

  const attemptLogin = (e: FormEvent) => {
    e.preventDefault();
    const formElement = document.querySelector("form");
    const formData = new FormData(formElement || undefined).entries();
    const body = Array
      .from(formData)
      .reduce((acc: {[k: string]: string | object}, [k, v]) => {
        acc[k] = v;
        return acc;
      }, {});

    const reqOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    };

    getData(`${API_URL}/login`, reqOptions).then(
      ({ auth_token: authToken }) => {
        localStorage.setItem("authToken", authToken);
        setIsLoggedIn(true);
        history.push("/");
      }
    ).catch(
      error => { setFailedLogin(error); }
    );
  };

  return (
    <>
      <Header basic>
        <div className="usa-nav-container">
          <PrimaryNav items={[<Link to="/">Home</Link>]} />
        </div>
      </Header>
      <GridContainer containerSize="desktop">
        {failedLogin && (
        <Alert type="warning" slim>
          Looks like that combo&apos;s not recognized - try again?
        </Alert>
        )}
        <Form onSubmit={attemptLogin} large>
          <Fieldset legend="Sign In" legendStyle="large">
            <Label htmlFor="email">Email:</Label>
            <TextInput
              id="email"
              name="email"
              type="text"
            />
            <Label htmlFor="password">Password:</Label>
            <TextInput
              id="password"
              name="password"
              type="password"
            />
            <Button type="submit">Sign in</Button>
          </Fieldset>
        </Form>
      </GridContainer>
    </>
  );
};

export default Login;
