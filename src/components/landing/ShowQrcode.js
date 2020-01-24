import React from "react";
import logo from "../../assets/img/xDemic-logo-01.png";
import { Col, Row, message } from "antd";
import axios from "axios";
import socketIOClient from "socket.io-client";
import { connect } from "react-redux";

import { addAdmin } from "../../containers/Admin/actions";

const ENDPOINT = "https://xdemic-api.herokuapp.com";

class ShowQrcode extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      qrcodeValue: null
    };
  }

  hasUnmounted = false;

  componentDidMount() {
    this.getQRCodeValue();
    // const history = useHistory();
    const socket = socketIOClient(ENDPOINT);
    socket.on("QRCodeSuccess", data => {
      const hide = message.loading("Everything is Good, Redirecting....", 1000);
      console.log("on QRCodeSuccess data is: ", data);
      if (data.status) {
        // route the app on "/admin" route
        setTimeout(() => {
          this.props.addAdmin(data.data);
          localStorage.setItem("userData", JSON.stringify(data.data));
          // console.log(JSON.parse(localStorage.getItem("userData")));
          hide();
          console.log("after action trigger ");
          this.props.history.push("/admin");
        }, 1500);
      }
    });
  }

  getQRCodeValue = async () => {
    try {
      const response = await axios.get(
        "https://xdemic-api.herokuapp.com/admin/qrcode"
      );
      this.setState({
        qrcodeValue: response.data
      });
      message.info("Scan QRCode to proceed");
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <div className="main__logo">
        <Row align="middle">
          <Col>
            <img alt={"logo"} src={logo} id="logo" />
          </Col>
          <Col>
            <div className="qr_code">
              <img
                alt={"qrcodeValue"}
                src={this.state.qrcodeValue}
                width="400"
                height="400"
              />
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    // testingState: state.global.error,
    // userData: state.global.userData.repositories || [{ name: "Hamza" }]
  };
};

const mapActionToProps = dispatch => {
  return {
    addAdmin: data => {
      dispatch(addAdmin(data));
    }
  };
};

export default connect(mapStateToProps, mapActionToProps)(ShowQrcode);
