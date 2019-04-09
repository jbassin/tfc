import React, { Component } from 'react';
import { Route, Switch, Redirect } from "react-router-dom";
import Header from "./header/Header";
import Hello from "./Hello";
import NoPage from "./404/NoPage";
import CompendiumEntry from "./compendium/CompendiumEntry";
import CompendiumEdit from "./compendium/CompendiumEdit";

class App extends Component {
    render() {
        return (
            <>
                <Header
                    title="The Floating Cup"/>
                <Switch>
                    {/* The Home Page */}
                    <Route
                        exact path="/"
                        component={Hello}/>

                    {/*  The Compendium Routes  */}
                    <Route
                        exact path="/compendium"
                        render={() => (<Redirect to="/compendium/entry/index"/>)}/>
                    <Route
                        path="/compendium/entry/:entry"
                        component={CompendiumEntry}/>
                    <Route
                        path="/compendium/edit/:entry"
                        component={CompendiumEdit}/>

                    {/*  404 Error Page  */}
                    <Route component={NoPage}/>
                </Switch>
            </>
        );
    }
}

export default App;
