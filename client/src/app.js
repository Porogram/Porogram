import React, { Component } from "react";
import { hot } from "react-hot-loader";
import "./app.css";

class App extends Component {
    render() {
        return (
            <div className="app">
                <h1> Hello world! </h1>
            </div>
        );
    }
}

export default hot(module)(App);
