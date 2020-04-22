import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import UserCard from "./Pages/CodeChallenge/UserCard";

class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <Route path="/" exact component={Home} />
          <Route path="/CodeChallenge" exact component={UserCard} />
        </Router>
      </div>
    );
  }
}

export default App;
