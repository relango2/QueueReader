import axios from "axios";
import {FETCH_USER, FETCH_SURVEYS, FETCH_QUEUE} from "./types";
//Action creaters are used when the front end tries to communicate the backend. We have a UDF defined.

export const fetchuser = () => async dispatch => {
  const res = await axios.get("/api/current_user");
  dispatch({type: FETCH_USER, payload: res.data});
};

export const submitSurvey = (values, history) => async dispatch => {
  console.log(values);
  const res = await axios.post("/api/surveys", values);

  history.push("/surveys");
  dispatch({type: FETCH_USER, payload: res.data});
};

export const fetchSurveys = () => async dispatch => {
  const res = await axios.get("/api/surveys");

  dispatch({type: FETCH_SURVEYS, payload: res.data});
};

export const fetchQueue = () => async dispatch => {
  const res = await axios.get("/api/queue");

  dispatch({type: FETCH_QUEUE, payload: res.data});
};
