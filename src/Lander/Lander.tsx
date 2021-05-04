import React, { FC, ReactNode, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  Button, GridContainer, Header, PrimaryNav
} from "@trussworks/react-uswds";
import { calcUpcomingNotes, useFetch } from "../utils";
import { API_URL } from "../constants";

const Overview = () => {
  const url = `${API_URL}/notes/overview`;
  const reqOptions = useMemo(() => ({
    method: "GET",
    headers: { Authorization: localStorage.getItem("authToken") }
  }), []);

  // @TODO: add loading spinner
  const { data } = useFetch(url, reqOptions);
  const { today, tomorrow, restOfWeek } = calcUpcomingNotes(data);

  return (
    <>
      <p>{`Today: ${today} notes`}</p>
      <p>{`Tomorrow: ${tomorrow} notes`}</p>
      <p>{`Rest of Week: ${restOfWeek} notes`}</p>
    </>
  );
};

const Welcome = () => (
  <>
    <p>(Or &quot;Forster&quot;; not sure which yet)</p>
    <p>(actual description of app goals goes here... later)</p>
  </>
);

type LanderProps = {
  setIsLoggedIn: (isLoggedIn: boolean) => void
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
        {isLoggedIn ? <Overview /> : <Welcome />}
      </GridContainer>
    </>
  );
};

export default Lander;
