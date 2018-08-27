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
      endpoint: "http://127.0.0.1:4001"
    };
  }
  componentDidMount() {
    //this.props.fetchQueue();
    const {endpoint} = this.state;
    const socket = socketIOClient(endpoint);
    socket.on("FromAPI", data => this.setState({response: data}));
    console.log();
  }

  renderSurveys() {
    var jsonObj = Object.keys(this.state.response);
    var jsonObjValue = Object.values(this.state.response);
    var arr = [];
    jsonObj.forEach(function(key) {
      arr.push(jsonObjValue[key]);
    });
    return arr.map((item, index) => {
      return (<div className="card darken-1" key={index}>
        <div className="card-content">
          <span className="card-title">{JSON.parse(item).value}</span>
          <p>{JSON.parse(item).key}</p>
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
