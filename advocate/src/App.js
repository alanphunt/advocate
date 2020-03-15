import React from 'react';
import Home from './pages/homepage/Home';
import Dashboard from './pages/dashboard/Dashboard';
import {Route, Switch} from "react-router-dom";
import {Redirect} from "react-router";

function App() {
  return (
    <div className="App">
        <Route render={({location})=>(
            <Switch location={location}>
                <Route path="/" exact component={Home}/>
                <Route path="/dashboard/:page" component={Dashboard}/>
                <Redirect from={"/dashboard"} to={"/dashboard/main"}/>
            </Switch>
        )}/>
    </div>
  );
}

export default App;
