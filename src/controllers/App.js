import React, { Component } from 'react';
import { Route, Switch } from "react-router-dom";
import Header from "./header/Header";
import Hello from "./Hello";
import NoPage from "./404/NoPage";

class App extends Component {
    render() {
        return (
            <>
                <Header
                    title="The Floating Cup"/>
                <Switch>
                    <Route
                        exact path="/"
                        component={Hello}/>
                    <Route component={NoPage}/>
                </Switch>
            </>
        );
    }
}

export default App;
