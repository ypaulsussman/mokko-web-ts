import React, {
  FC, ReactNode, useEffect, useMemo
} from "react";
import { Link } from "react-router-dom";
import {
  Button, GridContainer, Header, PrimaryNav
} from "@trussworks/react-uswds";
import { calcUpcomingNotes, useFetch } from "../utils";
import { API_URL } from "../constants";

type UpcomingNotes = {
  today: string[]
  tomorrow: string[]
  restOfWeek: string[]
}

type LanderProps = {
  isLoggedIn: boolean
  setIsLoggedIn: (isLoggedIn: boolean) => void
  upcomingNotes: UpcomingNotes
  setUpcomingNotes: (data: UpcomingNotes) => void
}

type OverviewProps = {
  upcomingNotes: UpcomingNotes
  setUpcomingNotes: (data: UpcomingNotes) => void
}

const Overview: FC<OverviewProps> = ({ setUpcomingNotes, upcomingNotes }) => {
  const url = `${API_URL}/notes/overview`;
  const reqOptions = useMemo(() => ({
    method: "GET",
    headers: { Authorization: localStorage.getItem("authToken") }
  }), []);

  // @TODO: add loading spinner
  const { data } = useFetch(url, reqOptions);
  useEffect(() => {
    setUpcomingNotes(calcUpcomingNotes(data));
  }, [data, setUpcomingNotes]);

  return (
    <>
      <p>{`Today: ${upcomingNotes.today.length} notes`}</p>
      <p>{`Tomorrow: ${upcomingNotes.tomorrow.length} notes`}</p>
      <p>{`Rest of Week: ${upcomingNotes.restOfWeek.length} notes`}</p>
    </>
  );
};

const Welcome: FC = () => (
  <>
    <p>(Or &quot;Forster&quot;; not sure which yet)</p>
    <p>(actual description of app goals goes here... later)</p>
  </>
);

const Lander: FC<LanderProps> = ({
  isLoggedIn, setIsLoggedIn, upcomingNotes, setUpcomingNotes
}) => {
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
        {isLoggedIn
          ? <Overview upcomingNotes={upcomingNotes} setUpcomingNotes={setUpcomingNotes} />
          : <Welcome />}
      </GridContainer>
    </>
  );
};

export default Lander;
