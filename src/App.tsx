import { Redirect, Route, Switch } from "wouter";
import ErrorPage from "./components/Error";
import Navigation from "./components/Navigation";
import Item from "./item/Item";
import Stories from "./stories/Stories";
import User from "./user/User";
import "./App.css";

export default function App() {
  return (
    <>
      <Navigation />

      <main>
        <Switch>
          <Route path="/item/:id">{(params) => <Item id={params.id} />}</Route>
          <Route path="/user/:username">
            {(params) => <User username={params.username} />}
          </Route>
          <Route path="/:stories/:page">
            {(params) => (
              <Stories stories={params.stories} page={params.page} />
            )}
          </Route>
          <Route path="/">
            <Redirect to="/top/1" />
          </Route>
          <Route>
            <ErrorPage />
          </Route>
        </Switch>
      </main>
    </>
  );
}
