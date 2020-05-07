import React from "react";
import { Provider } from "react-redux";
import ReduxToastr from "react-redux-toastr";

import store from "./redux/store/index";
import Routes from "./routes/routes";

function App() {
  return (
    <Provider store={store}>
      <Routes />
      <ReduxToastr
        timeOut={5000}
        newestOnTop={true}
        position="top-right"
        getState={state => state.toastr} // This is the default
        transitionIn="fadeIn"
        transitionOut="fadeOut"
        progressBar={false}
        closeOnToastrClick={false}
      />
    </Provider>
  );
}

export default App;
