import React, {Component} from "react";
import {connect} from "react-redux";
import {fetchSurveys} from "../../actions";
import {fetchQueue} from "../../actions";
import socketIOClient from "socket.io-client";

class QueueReader extends Component {
  constructor() {
    super();
    this.state = {
      response: false,
      endpoint: ("http://127.0.0.1:5000/")
    };
  }
  componentDidMount() {
    //this.props.fetchQueue();
    const {endpoint} = this.state;
    //-- UnComment this For Heroku Deployment
    const socket = socketIOClient();
    //--UnComment this For local Deployment
    //const socket = socketIOClient(endpoint);
    socket.on("FromAPI", data => this.setState({response: data}));
  }

  renderSurveys() {
    var json = this.state.response;
    var arr = [];
    Object.keys(json).forEach(function(key) {
      console.log(key);
      arr.push(json[key]);
    });

    console.log(arr);
    return Object.keys(this.state.response).reverse().map((item, index) => {
      console.log(item);
      return (<div className="card darken-1" key={index}>
        <div className="card-content">
          <span className="card-title">{item}</span>
          <p>Key: {JSON.parse(this.state.response[item]).key}</p>
          <p className="right">
            Value: {JSON.parse(this.state.response[item]).value}
          </p>
        </div>
      </div>);
    });
  }

  render() {
    return <div>{this.renderSurveys()}</div>;
  }
}

function mapStateToProps({surveys}) {
  return {surveys};
}

export default connect(mapStateToProps, {fetchQueue})(QueueReader);
