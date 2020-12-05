import React, { useEffect, useContext, useState } from "react";
import { Home } from "./Pages/Home";
import Header from "./Components/Header";
import Corrections from "./Pages/Corrections";
import { Router } from "@reach/router";
import "./App.css";
import { AppContext } from "./AppContext";
import axios from "axios";

const ENDPOINT = "https://correction-devoirs.herokuapp.com";

const App = () => {
  const { state, dispatch } = useContext(AppContext);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    if (isLoading) {
      axios
        .all([
          axios.get(ENDPOINT + "/api/listeeleves"),
          axios.get(ENDPOINT + "/api/listeds"),
          axios.get(ENDPOINT + "/api/listequestions"),
        ])
        .then(
          axios.spread((res1, res2, res3) => {
            dispatch({
              type: "LISTEELEVES",
              payload: res1.data,
            });
            dispatch({
              type: "LISTEDS",
              payload: res2.data,
            });
            dispatch({
              type: "LISTEQUESTIONS",
              payload: res3.data,
            });
          })
        )
        .finally(setLoading(false));
    }
  }, [dispatch, isLoading]);

  if (isLoading) {
    return <div>Chargement...</div>;
  }

  return (
    <div className="App">
      <Header />
      <Router>
        <Home path="/" />
        <Corrections
          path="/corrections/:id"
          listeQuestions={state.listeQuestions}
          key={document.location.href}
        />
      </Router>
    </div>
  );
};

export default App;
