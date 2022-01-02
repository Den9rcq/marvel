import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import AppHeader from "../appHeader/AppHeader";
import { ComicsPage, MainPage } from "../pages";

const App = () => {


    return (
        <div className="app">
            <Router>
                    <AppHeader/>
                    <main>
                        <Route exact path="/">
                            <MainPage/>
                        </Route>
                        <Route path="/comics">
                            <ComicsPage/>
                        </Route>
                    </main>
            </Router>
        </div>
    )
}

export default App;