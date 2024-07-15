import React from 'react';
import Register from "./components/Register";
import ipConfig from "./ipConfig.json";
import Checkout from "./components/Checkout";
import Thanks from './components/Thanks'
import { Route, Switch } from "react-router-dom";
import Login from "./components/Login";
import Products from "./components/Products";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";

export const config = {
  endpoint: `http://${ipConfig.workspaceIp}:8082/api/v1`,
};

function App() {
  return (
    <div className="App">
      {/* Use Switch to match only one route at a time */}
      <Switch>
        <Route path="/register">
          <Register/>
        </Route>
        <Route path="/login">
          <Login/>
        </Route>
        <Route  path="/checkout">
             <Checkout /> 
            </Route>
            <Route  path="/Thanks">
             <Thanks /> 
            </Route>
        <Route exact path="/">
          <Products/>
        </Route>
        
      </Switch>
    </div>
  );
}

export default App;
