import React from 'react';
import Home from './pages/homepage/Home';
import Dashboard from './pages/Dashboard';
import Classroom from './pages/Classroom';
import {Route, Switch} from "react-router-dom";

function App() {
  return (
    <div className="App">
        <Route render={({location})=>(
            <Switch location={location}>
                <Route path="/" exact component={Home}/>
                <Route path="/dashboard" component={Dashboard}/>
                <Route path="/classroom" component={Classroom}/>
            </Switch>
        )}/>
    </div>
  );
}

export default App;
