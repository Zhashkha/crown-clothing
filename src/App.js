import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import "./App.css";

import HomePage from "./pages/homepage/home.component";

const HatsPage = () => (
  <div>
    <h1>HATS PAGE</h1>
    <Link to="/">HOME PAGE</Link>
  </div>
);

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/shop/hats" component={HatsPage} />
      </Switch>
    </div>
  );
}

export default App;
