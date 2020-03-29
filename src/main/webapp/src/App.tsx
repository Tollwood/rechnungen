import './App.css';
import * as React from "react";
import {Component} from "react";
import 'semantic-ui/dist/semantic.min.css';
import {ContentType} from "./start/ContentType";
import Company from "./employees/Company";
import BackendAlerts from "./BackendAlerts";
import {Admin} from "./Admin";
import {BrowserRouter as Router, Link, Route, Switch} from "react-router-dom";
import Home from "./Home";

interface AppState {
    activeOrder?: Link,
    activeContent: ContentType,
    company: Company
}

interface AppProps {
}

class App extends Component<AppProps, AppState> {

    constructor(props: AppProps) {
        super(props);
        this.state = {
            activeContent: ContentType.NONE,
            company: new Company()
        };
    }

    render() {
        return (
            <BackendAlerts>
                <Router>
                    <Switch>
                        <Route path="/admin">
                            <Admin/>
                        </Route>
                        <Route path="/">
                            <Home/>
                        </Route>
                    </Switch>
                </Router>
            </BackendAlerts>
        );
    }
}

export default App;
