import React, { FC, ReactNode } from "react";
import {
  Button, GridContainer, Header, PrimaryNav
} from "@trussworks/react-uswds";

type ReviewProps = {
  isLoggedIn: boolean
  setIsLoggedIn: (isLoggedIn: boolean) => void
}

const Review: FC<ReviewProps> = ({ isLoggedIn, setIsLoggedIn }) => {
  const logOut = () => {
    localStorage.removeItem("mokkoAuthToken");
    setIsLoggedIn(false);
  };

  const navLinks: ReactNode[] = isLoggedIn
    ? [<Button type="button" onClick={logOut}>Log Out</Button>]
    : [<></>];

  return (
    <>
      <Header basic>
        <div className="usa-nav-container">
          <PrimaryNav items={navLinks} />
        </div>
      </Header>
      <GridContainer containerSize="desktop">

        <div>sup</div>
      </GridContainer>
    </>
  );
};

export default Review;
