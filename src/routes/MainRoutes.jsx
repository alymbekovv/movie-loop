import React from "react";
import { Route, Routes } from "react-router-dom";
import HomeBanner from "../home/HomeBanner/HomeBanner";
import Home from "../home/Home";
import Details from "../components/pages/details/Details";
import ActorsDetails from "../components/pages/details/actorsDetails/ActorsDetails";

const MainRoutes = () => {
  const routes = [
    {
      link: "/",
      element: <Home />,
    },
    {
      link: "/details/:id",
      element: <Details />,
    },
    {
      link: "/actorsDetails/:id",
      element: <ActorsDetails />,
    },
  ];
  return (
    <div>
      <Routes>
        {routes.map((item, index) => (
          <Route key={index} path={item.link} element={item.element} />
        ))}
      </Routes>
    </div>
  );
};

export default MainRoutes;
