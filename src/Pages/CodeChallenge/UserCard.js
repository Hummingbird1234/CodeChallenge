import React, { Component } from "react";
import { Button, Accordion, Card, Modal, FormControl } from "react-bootstrap";
import TitleAC from "./TitleAC";
import { database } from "./firebaseConfig";

export default class UserCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      usersArray: [
        {
          title: "Laura AC",
          city: "Sydney",
          fruits: ["apple", "banana"],
          id: "",
        },
        {
          title: "Grace AC",
          city: "Tokyo",
          fruits: ["watermelon", "pear"],
          id: "",
        },
        {
          title: "Hummingbird AC",
          city: "Athens",
          fruits: ["grapes", "mango"],
          id: "",
        },
      ],
      show: false,
      addShow: false,
      editTitle: "",
      editCity: "",
      editFruits: "",
      editId: 0,
    };
  }

  // Modal Open
  handleModalOpen = (id) => {
    this.setState({
      show: id,
      editTitle: this.state.usersArray[id].title,
      editCity: this.state.usersArray[id].city,
      editFruits: this.state.usersArray[id].fruits,
      editId: id,
    });
  };

  handleChangeTitle = (e) => {
    this.setState({
      editTitle: e.target.value,
    });
  };

  handleChangeCity = (e) => {
    this.setState({
      editCity: e.target.value,
    });
  };

  handleChangeFruits = (e) => {
    this.setState({
      editFruits: e.target.value,
    });
  };

  handleEditionSubmit = (e, id) => {
    e.preventDefault();
    //Store the new values
    var newTitle = this.state.editTitle;
    var newCity = this.state.editCity;
    var newFruits = this.state.editFruits.split(",");
    var newId = this.state.editId;
    // Create a new array
    var newArray = this.state.usersArray;
    this.setState({ usersArray: newArray });
    //Create a new object with 3 keys: id,title and fruits with values of a string and an array of fruits
    {
      newArray.splice(newId, 1, {
        title: newTitle,
        city: newCity,
        fruits: newFruits,
      });
    }
    //Push the new object into usersArray
    // newArray.push(editObject);

    //Set state with the new array to have the app rerender
    this.setState({
      usersArray: newArray,
      show: false,
    });
  };

  handleAddUsersModal = () => {
    this.setState({
      addShow: true,
    });
  };

  handleNewUsers = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleNewUsersSubmit = (e) => {
    e.preventDefault();
    //Create an array from fruits which is a string stored in state
    var fruitsArray = this.state.fruits.split(",");
    //Create a new object with 2 keys: title and fruits with values of a string and an array of fruits
    var usersObject = {
      title: this.state.title,
      city: this.state.city,
      fruits: fruitsArray,
    };
    //Push the new object into usersArray
    var newUsersArray = this.state.usersArray;
    newUsersArray.push(usersObject);
    //Set state with the new array to have the app rerender<-WHEN THERE IS NO DATABASE
    //COMMENT SET STATE TO REPLACE IT WITH DATABASE SET
    // this.setState({
    //   usersArray: newUsersArray,
    //   addShow: false,
    //   title: "",
    //   city: "",
    //   fruits: "",
    // });
    database.ref("/usersArray").set(newUsersArray);
    this.setState({ addShow: false });
  };

  // Modal Close
  handleClose = () => {
    this.setState({
      show: false,
      addShow: false,
    });
  };

  deleteUsers = (id) => {
    var newArray = this.state.usersArray;
    newArray.splice(id, 1);
    this.setState({ usersArray: newArray });
    database.ref("/usersArray").set(newArray);
  };

  render() {
    return (
      <div>
        <TitleAC />
        {this.state.usersArray.map((user, id) => {
          return (
            <Accordion key={id}>
              <Card>
                <Card.Header>
                  <Accordion.Toggle as={Button} variant="link" eventKey="0">
                    {user.title}
                  </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey="0">
                  <Card.Body>
                    <p key={id}>City:{user.city}</p>
                    <p>Fruits</p>
                    <ul>
                      {user.fruits.map((fruit, id) => {
                        return <li key={id}>{fruit}</li>;
                      })}
                    </ul>
                    <Button
                      variant="info"
                      onClick={() => this.handleModalOpen(id)}
                    >
                      Edit
                    </Button>

                    <Modal
                      show={this.state.show === id}
                      onHide={this.handleClose}
                    >
                      <Modal.Header closeButton>
                        <Modal.Title>Edit User</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <form onSubmit={this.handleEditionSubmit}>
                          <label htmlFor="title">User name</label>
                          <FormControl
                            type="text"
                            name="title"
                            // id={id}
                            value={this.state.editTitle}
                            onChange={(e) => this.handleChangeTitle(e)}
                          />
                          <br />
                          <label htmlFor="city">City</label>
                          <FormControl
                            type="text"
                            name="city"
                            value={this.state.editCity}
                            onChange={this.handleChangeCity}
                          />
                          <br />
                          <label htmlFor="fruits">Fruits</label>
                          <FormControl
                            type="text"
                            name="fruits"
                            value={this.state.editFruits}
                            onChange={this.handleChangeFruits}
                          />
                          <Button type="submit">Submit</Button>
                        </form>
                      </Modal.Body>
                      <Modal.Footer>
                        <Button onClick={this.handleClose}>Close</Button>
                      </Modal.Footer>
                    </Modal>

                    <Button
                      variant="danger"
                      onClick={() => this.deleteUsers(id)}
                    >
                      Delete
                    </Button>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
            </Accordion>
          );
        })}

        {/******** ADD USERS **********/}
        <br></br>
        <Button className="btn-warning" onClick={this.handleAddUsersModal}>
          Add a User :)
        </Button>

        <Modal show={this.state.addShow} onHide={this.handleAddUsersModal}>
          <Modal.Header closeButton>
            <Modal.Title>Add User</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={this.handleNewUsersSubmit}>
              <label htmlFor="title">User name</label>
              <FormControl
                type="text"
                name="title"
                onChange={this.handleNewUsers}
                value={this.state.title}
                required
              />
              <br />
              <label htmlFor="city">City</label>
              <FormControl
                type="text"
                name="city"
                onChange={this.handleNewUsers}
                value={this.state.city}
                required
              />
              <br />
              <label htmlFor="fruits">Fruits</label>
              <FormControl
                type="text"
                name="fruits"
                onChange={this.handleNewUsers}
                value={this.state.fruits}
                required
              />

              <Button type="submit">Submit</Button>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handleClose}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
