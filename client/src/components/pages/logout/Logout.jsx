  
import React, { Component } from "react";
export default class Logout extends Component {
  componentDidMount() {
    setTimeout(() => {
      this.props.history.push("/");
    }, 3000);
  }

  constructor(props) {
    super(props);
    localStorage.removeItem("token");
  }
  render() {
    return (
      <div className="container mt-4 col-lg-6">
        <h5 className="alert alert-info">
          <i className="fa fa-info-circle"></i>&nbsp;Logged out
          successfully.&nbsp;Redirecting to <i>Login</i> page.
        </h5>
      </div>
    );
  }
}