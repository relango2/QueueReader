import {FETCH_SURVEYS, FETCH_QUEUE} from "../actions/types";

export default function(state = [], action) {
  switch (action.type) {
    case FETCH_QUEUE:
      return action.payload;
    case FETCH_SURVEYS:
      return action.payload;
    default:
      return state;
  }
}
