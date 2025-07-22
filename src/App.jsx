import React from "react";
import Layout from "./components/Layout/Layout";
import "./App.css";
import Img from "./ui/LazyLoadImage/Img";
import MainRoutes from "./routes/MainRoutes";
import ScrollToTop from "./components/scrollToTop/ScrollToTop";
import { ToastContainer } from "react-toastify";

const App = () => {
  return (
    <div>
      <ToastContainer />
      <ScrollToTop />
      <MainRoutes />
    </div>
  );
};

export default App;
