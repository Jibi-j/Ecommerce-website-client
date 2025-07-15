import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider, useSelector } from "react-redux";
import App from "./App";
import store from "./redux/store";
import "./index.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ThemeWrapper = ({ children }) => {
  const mode = useSelector((state) => state.theme.mode);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", mode);
  }, [mode]);

  return (
    <>
      {children}
      <ToastContainer />
    </>
  );
};

const RootApp = () => (
  <Provider store={store}>
    <BrowserRouter>
      <ThemeWrapper>
        <App />
      </ThemeWrapper>
    </BrowserRouter>
  </Provider>
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RootApp />
  </React.StrictMode>
);





