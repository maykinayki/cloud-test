import React from "react";
import { render } from "react-dom";
import _ from "lodash";
import { HomePageComponent } from "./pages/HomePage";

export default render(
  <HomePageComponent />,
  document.getElementById(_.toString("app"))
);
