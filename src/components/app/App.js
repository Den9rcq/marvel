import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AppHeader from "../appHeader/AppHeader";
import Spinner from "../spinner/Spinner";
import SingleComicLayout from "../pages/singleComicLayout/SingleComicLayout";
import SingleCharacterLayout from "../pages/singleCharacterLayout/SingleCharacterLayout";

const Page404 = lazy(() => import("../pages/404"))
const MainPage = lazy(() => import("../pages/MainPage"))
const ComicsPage = lazy(() => import("../pages/ComicsPage"))
const SinglePage = lazy(() => import("../pages/SinglePage"))


const App = () => {
    return (
        <div className="app">
            <Router>
                <AppHeader/>
                <main>
                    <Suspense fallback={<Spinner/>}>
                        <Switch>
                            <Route exact path="/">
                                <MainPage/>
                            </Route>
                            <Route exact path="/comics">
                                <ComicsPage/>
                            </Route>
                            <Route exact path="/comics/:id">
                                <SinglePage Component={SingleComicLayout} dataType="comic"/>
                            </Route>
                            <Route exact path="/characters/:id">
                                <SinglePage Component={SingleCharacterLayout} dataType="character"/>
                            </Route>
                            <Route path="*">
                                <Page404/>
                            </Route>
                        </Switch>
                    </Suspense>
                </main>
            </Router>
        </div>
    )
}

export default App;