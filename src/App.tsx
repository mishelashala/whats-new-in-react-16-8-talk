import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { UserServiceContext } from "./providers";
import { UserService } from "./services";
import { Profile } from "./routes/Profile";

const App = () => {
  return (
    <UserServiceContext.Provider value={UserService}>
      <UserServiceContext.Consumer>
        {userService => (
          <Router>
            <Switch>
              <Route
                path="/"
                component={() => <Profile userService={userService} />}
              />
            </Switch>
          </Router>
        )}
      </UserServiceContext.Consumer>
    </UserServiceContext.Provider>
  );
};

export default App;
