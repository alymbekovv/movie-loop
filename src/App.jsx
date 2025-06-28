import React from "react";
import Layout from "./components/Layout/Layout";
import "./App.css";
import Img from "./ui/LazyLoadImage/Img";
import MainRoutes from "./routes/MainRoutes";
import ScrollToTop from "./components/scrollToTop/ScrollToTop";

const App = () => {
  return (
    <div>
      <ScrollToTop />
      <MainRoutes />
    </div>
  );
};

export default App;
