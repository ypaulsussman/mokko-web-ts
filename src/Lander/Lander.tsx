import React, { ReactNode, FC } from "react";
import { Link } from "react-router-dom";
import {
  Button, GridContainer, Header, PrimaryNav
} from "@trussworks/react-uswds";

type LanderProps = {
  // eslint-disable-next-line no-unused-vars
  setIsLoggedIn: (arg0: boolean) => void
  isLoggedIn: boolean
}

const Lander: FC<LanderProps> = ({ isLoggedIn, setIsLoggedIn }) => {
  const logOut = () => {
    localStorage.removeItem("authToken");
    setIsLoggedIn(false);
  };

  const navLinks: ReactNode[] = isLoggedIn
    ? [<Button type="button" onClick={logOut}>Log Out</Button>]
    : [<Link to="/login">Log In</Link>];

  return (
    <>
      <Header basic>
        <div className="usa-nav-container">
          <PrimaryNav items={navLinks} />
        </div>
      </Header>
      <GridContainer containerSize="desktop">
        <h1>Welcome to Mokko!</h1>
        <p>(Or &quot;Forster&quot;; not sure which yet)</p>
      </GridContainer>
    </>
  );
};

export default Lander;
