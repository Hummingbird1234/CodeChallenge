import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import UserCard from "./Pages/CodeChallenge/UserCard";
import Example from "./Pages/CodeChallenge/Example";

class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <Route path="/" exact component={Home} />
          <Route path="/CodeChallenge" exact component={UserCard} />
          <Route path="/Example" exact component={Example} />
        </Router>
      </div>
    );
  }
}

export default App;
