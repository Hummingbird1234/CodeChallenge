import React, { Component } from "react";
import { Accordion, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

class Home extends Component {
  render() {
    return (
      <div>
        <h1 className="title-home">Welcome to ReferAll's CodeChallenge</h1>
        <br></br>
        <Button
          href="http://localhost:3000/CodeChallenge"
          variant="warning"
          size="lg"
        >
          Click Me :)
        </Button>
      </div>
    );
  }
}

export default Home;
