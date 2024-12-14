import { combineReducers } from "redux";

import user from "./user";
import employee from "./emloyee";

export default combineReducers({
  user,
  employee,
});
