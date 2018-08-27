import React, {Component} from "react";
import {BrowserRouter, Route} from "react-router-dom";
import {connect} from "react-redux";
import * as actions from "../actions";
import Header from "./Header";
import Landing from "./Landing";
import DashBoard from './DashBoard';
import SurveyNew from './surveys/SurveyNew';
import QueueReader from './surveys/QueueReader';

class App extends Component {
  componentDidMount() {
    this.props.fetchuser();
  }
  render() {
    return (<div className="container">
      <BrowserRouter>
        <div>
          <Header/>
          <Route exact="exact" path="/" component={Landing}/>
          <Route exact="exact" path="/surveys" component={DashBoard}/>
          <Route exact="exact" path="/surveys/New" component={SurveyNew}/>
          <Route exact="exact" path="/queue" component={QueueReader}/>
        </div>
      </BrowserRouter>
    </div>);
  }
}

export default connect(null, actions)(App);
