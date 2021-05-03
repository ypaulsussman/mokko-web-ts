import React, { ReactNode, FC } from "react";
import { Link } from "react-router-dom";
import {
  GridContainer, Header, PrimaryNav
} from "@trussworks/react-uswds";

type LanderProps = {
  isLoggedIn: boolean
}

const Lander: FC<LanderProps> = ({ isLoggedIn }) => {
  // console.log("isLoggedIn: ", isLoggedIn);
  // const bar = sessionStorage.getItem("authToken");
  // console.log("bar-in-lander: ", bar);

  const navLinks: ReactNode[] = isLoggedIn ? [
    <Link to="/login">Log In</Link>
  ] : [];

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
