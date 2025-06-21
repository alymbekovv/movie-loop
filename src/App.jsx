import React from "react";
import Layout from "./components/Layout/Layout";
import "./App.css";
import Img from "./ui/LazyLoadImage/Img";
import MainRoutes from "./routes/MainRoutes";

const App = () => {
  return (
    <div>
      <MainRoutes />
    </div>
  );
};

export default App;
