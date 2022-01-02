import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AppHeader from "../appHeader/AppHeader";
import Spinner from "../spinner/Spinner";

const Page404 = lazy(() => import("../pages/404"))
const MainPage = lazy(() => import("../pages/MainPage"))
const ComicsPage = lazy(() => import("../pages/ComicsPage"))
const SingleComicPage = lazy(() => import("../pages/singleComicPage/SingleComicPage"))


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
                            <Route exact path="/comics/:comicId">
                                <SingleComicPage/>
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