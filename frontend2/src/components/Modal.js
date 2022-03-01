import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Input,
  Label,
} from "reactstrap";

export default class CustomModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: this.props.activeItem,
    };
  }

  handleChange = (e) => {
    let { name, value } = e.target;

    if (e.target.type === "checkbox") {
      value = e.target.checked;
    }

    const activeItem = { ...this.state.activeItem, [name]: value };

    this.setState({ activeItem });
  };

  render() {
    const { toggle, onSave } = this.props;

    if (this.state.activeItem.text == "") {
      return (
        <Modal isOpen={true} toggle={toggle}>
          <ModalHeader toggle={toggle}>New post</ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup>
                <Label for="post-text">Limit 244 characters</Label>
                <Input
                  type="text"
                  id="post-text"
                  name="text"
                  value={this.state.activeItem.text}
                  onChange={this.handleChange}
                  placeholder="Type here"
                />
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button
              color="success"
              onClick={() => onSave(this.state.activeItem)}
            >
              Post!
            </Button>
          </ModalFooter>
        </Modal>
      );
    }
    else {
      return (
        <Modal isOpen={true} toggle={toggle}>
          <ModalHeader toggle={toggle}>Edit post</ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup>
                <Label for="post-text">Limit 244 characters</Label>
                <Input
                  type="text"
                  id="post-text"
                  name="text"
                  value={this.state.activeItem.text}
                  onChange={this.handleChange}
                  placeholder="Type here"
                />
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button
              color="success"
              onClick={() => onSave(this.state.activeItem)}
            >
              Save!
            </Button>
          </ModalFooter>
        </Modal>
      );
    }
  }
}
