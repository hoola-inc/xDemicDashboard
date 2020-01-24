import React, { Component } from "react";
import { Modal, Button, Input, Form, message } from "antd";

class UpdatePersonModal extends Component {
  constructor(props) {
    super(props);
    this.state = { visible: props.showModal };
  }

  showModal = () => {
    console.log("calling show modal");
    this.setState({
      visible: true
    });
  };

  handleOk = e => {
    console.log(e);
    this.setState({
      visible: false
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false
    });
  };

  changeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  submitHandler = e => {
    e.preventDefault();
    this.enterLoading();
    // this.handleSubmit()
    this.sendCourse();
  };

  render() {
    const { handleOk, onCancel, title, showModal } = this.props;
    const { fullName, birthDate, gender, email } = this.props.data;
    console.log(
      "update person modal showModal this.props is: ",
      this.props.data
    );
    // this.showModal();
    return (
      <div>
        {/* <Button type="primary" onClick={this.showModal}>
          Update Person
        </Button> */}
        <Modal
          title={title}
          visible={showModal}
          onOk={() => handleOk()}
          onCancel={() => onCancel()}
        >
          <Form onSubmit={this.submitHandler}>
            <Form.Item label="Name">
              <Input
                placeholder={`Enter name`}
                allowClear
                name="name"
                value={fullName}
              />
            </Form.Item>

            <Form.Item label="Date of birth">
              <Input
                placeholder={`Enter date of birth`}
                allowClear
                name="birthDate"
                value={birthDate}
              />
            </Form.Item>

            <Form.Item label="Gender">
              <Input
                placeholder={`Enter gender`}
                allowClear
                name="gender"
                value={gender}
              />
            </Form.Item>

            <Form.Item label="Email">
              <Input
                placeholder={`Enter email`}
                allowClear
                name="email"
                value={email}
              />
            </Form.Item>

            <Button type="primary" ghost>
              Submit
            </Button>
          </Form>
        </Modal>
      </div>
    );
  }
}

export default UpdatePersonModal;