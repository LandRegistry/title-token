import React, { Component } from "react";
import  { Drizzle, generateStore } from "drizzle";
import { DrizzleProvider, DrizzleContext } from "drizzle-react";

import "../static/css/App.css";

import drizzleOptions from "../drizzleOptions";
import TitleTokenApp from "./TitleTokenApp";

const drizzleStore = generateStore(drizzleOptions);
const drizzle = new Drizzle(drizzleOptions, drizzleStore);

class App extends Component {

  render() {
    return (
      <DrizzleContext.Provider drizzle={drizzle}>
        {/* <LoadingContainer> */}
        <TitleTokenApp />
        {/* </LoadingContainer> */}
      </DrizzleContext.Provider>
    );
  }
}

export default App;
