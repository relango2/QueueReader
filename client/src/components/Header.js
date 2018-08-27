import React, {Component} from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import Payments from "./Payments";

class Header extends Component {
  renderContent() {
    switch (this.props.auth) {
      case null:
        return "Still Deciding";
      case false:
        return (<li>
          <a href="/auth/google">Login in with google</a>
        </li>);
      default:
        //Change this as an array to accomodate the payment sections too.
        return [
          <li key="1">
            <Payments/>
          </li>,
          <li key="3" style={{
              margin: "10 10px"
            }}>
            Credits:{this.props.auth.credits}
          </li>,
          <li key="2">
            <a href="/api/logout">Logout</a>
          </li>
        ];
    }
  }
  render() {
    //console.log(this.props);
    return (<nav>
      <div className="nav-wrapper">
        <Link to={this.props.auth
            ? "/queue"
            : "/"} className="left brand-logo">
          Queue
        </Link>
        <ul className="right">{this.renderContent()}</ul>
      </div>
    </nav>);
  }
}
function mapStateToProps({auth}) {
  return {auth};
}
export default connect(mapStateToProps)(Header);
