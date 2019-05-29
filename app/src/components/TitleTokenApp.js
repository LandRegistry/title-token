import { DrizzleContext } from "drizzle-react";

export default () => (
  <DrizzleContext.Consumer>
    {drizzleContext => {
      const { drizzle, drizzleState, initialized } = drizzleContext;
  
      if (!initialized) {
        return "Loading...";
      }

      return (
        <div className="App">
          <Header />
          <Account />
          <TitleTokenContainer drizzle={drizzle} drizzleState={drizzleState} />
        </div>
      );
    }}
  </DrizzleContext.Consumer>
)
