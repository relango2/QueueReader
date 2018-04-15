import axios from "axios";
import { FETCH_USER } from "./types";
//Action creaters are used when the front end tries to communicate the backend. We have a UDF defined.

export const fetchuser = () => async dispatch => {
  const res = await axios.get("/api/current_user");
  dispatch({ type: FETCH_USER, payload: res.data });
};

export const handleToken = token => async dispatch => {
  const res = await axios.post("/api/stripe", token);
  dispatch({ type: FETCH_USER, payload: res.data });
};
