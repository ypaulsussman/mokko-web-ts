import React, { useState } from "react";
import {
  BrowserRouter as Router, Switch, Route
} from "react-router-dom";
import Login from "../Login/Login";
import Lander from "../Lander/Lander";

import "./App.css";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/login">
            { isLoggedIn
              ? <Lander isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
              : <Login setIsLoggedIn={setIsLoggedIn} />}
          </Route>
          <Route path="/">
            <Lander isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;