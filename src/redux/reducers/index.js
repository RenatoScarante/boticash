import { combineReducers } from "redux";

import user from "./userReducers";
import auth from "./authReducers";
import { reducer as toastr } from "react-redux-toastr";

export default combineReducers({
  user,
  auth,
  toastr
});
