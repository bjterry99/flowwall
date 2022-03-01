import React, { Component } from "react";
import Modal from "./components/Modal";
import axios from "axios";
import LoginButton from './components/LoginButton';
import LogoutButton from './components/LogoutButton';
import Profile from './components/Profile'
import { withAuth0 } from '@auth0/auth0-react';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      postList: [],
      modal: false,
      activeItem: {
        text: "",
      },
    };
  }

  componentDidMount() {
    this.refreshList();
  }

  refreshList = () => { //refresh the wall to find posts
    axios
      .get("/posts/")
      .then((res) => this.setState({ postList: res.data }))
      .catch((err) => console.log(err));
  };

  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };

  handleSubmit = (item) => { //as titled
    this.toggle();

    if (item.post_id) {
      axios
        .put(`/posts/${item.post_id}/`, item)
        .then((res) => this.refreshList());
      return;
    }
    axios
      .post("/posts/", item)
      .then((res) => this.refreshList());
  };

  handleDelete = (item) => { //as titled
    axios
      .delete(`/posts/${item.post_id}/`)
      .then((res) => this.refreshList());
  };

  createItem = () => { //create post
    const item = { text: ""};

    this.setState({ activeItem: item, modal: !this.state.modal });
  };

  editItem = (item) => { //edit post
    this.setState({ activeItem: item, modal: !this.state.modal });
  };

  renderTabList = () => {
    return (
      <div className="nav nav-tabs">
        <span>
          <h1>Flow Wall</h1>
        </span>
      </div>
    );
  };

  renderItems = () => {
    const { user } = this.props.auth0;

    const { viewCompleted } = this.state;
    const newItems = this.state.postList.filter(
      (item) => item.completed == viewCompleted
    );

    if (!user) return newItems.map((item) => (
      <li
        key={item.post_id}
        className="list-group-item d-flex justify-content-between align-items-center"
      >
        <span>
          {item.text}
        </span>
      </li>
    ))

    return newItems.map((item) => (
      <li
        key={item.post_id}
        className="list-group-item d-flex justify-content-between align-items-center"
      >
        <span
          className={`todo-title mr-2 ${
            this.state.viewCompleted ? "completed-todo" : ""
          }`}
          title={item.description}
        >
          {item.text}
        </span>
        <span>
          <button //edit button
            className="btn btn-secondary mr-2"
            onClick={() => this.editItem(item)}
          >
            Edit
          </button>
          <button //delete button
            className="btn btn-danger"
            onClick={() => this.handleDelete(item)}
          >
            Delete
          </button>
        </span>
      </li>
    ));
  };

  render() {
    const { user } = this.props.auth0;

    if (!user) return ( //the main content is the user is logged out
      <main className="container">
        <h1 className="text-white text-uppercase text-center my-4">Flowell Wall</h1>

        <div className="row">
          <div className="col-md-6 col-sm-10 mx-auto p-0">
            <div className="card p-3">
              <div className="mb-4 d-flex flex-row-reverse">

                <div class="p-2">
                  <LoginButton />
                </div>

              </div>

              {this.renderTabList()}
              <ul className="list-group list-group-flush border-top-0">
                {this.renderItems()}

              </ul>
            </div>
          </div>
        </div>

        {this.state.modal ? (
          <Modal
            activeItem={this.state.activeItem}
            toggle={this.toggle}
            onSave={this.handleSubmit}
          />
        ) : null}

      </main>
    )

    return ( //main content if user is logged in
      <main className="container">
        <h1 className="text-white text-uppercase text-center my-4">Flowell Wall</h1>

        <div className="row">
          <div className="col-md-6 col-sm-10 mx-auto p-0">
            <div className="card p-3">
                <div className="mb-4 d-flex justify-content-between">

                  <div className="p-2">
                    <button
                        className="btn btn-primary"
                        onClick={this.createItem}
                      >
                        Create post
                    </button>
                  </div>
                  
                  <div className="p-2">
                    <LogoutButton />
                  </div>
                  
                </div>

              <Profile/>

              {this.renderTabList()}
              <ul className="list-group list-group-flush border-top-0">
                {this.renderItems()}

              </ul>
            </div>
          </div>
        </div>

        {this.state.modal ? (
          <Modal
            activeItem={this.state.activeItem}
            toggle={this.toggle}
            onSave={this.handleSubmit}
          />
        ) : null}
        
      </main>
    );
  }
}

export default withAuth0(App);