import React, { useEffect, useState } from "react";
import axios from "axios";
import "katex/dist/katex.min.css";
import Latex from "react-latex-next";
import "./Corrections.css";
import { AppContext } from "../AppContext";
const ENDPOINT = "https://correction-devoirs.herokuapp.com";

const Corrections = ({ id, listeQuestions }) => {
  const { state, dispatch } = React.useContext(AppContext);
  const [devoir, eleve] = id.split("+");
  const [notes, setNotes] = useState({});
  const [isLoading, setLoading] = useState(true);
  const questions = listeQuestions[devoir];
  const handleUpdate = (key, value) => {
    dispatch({
      type: "UPDATE",
      payload: { key: key, value: value },
    });
  };

  useEffect(() => {
    if (state.eleve === "Élève" || state.devoir === "Devoir") {
      dispatch({ type: "ELEVE", payload: eleve });
      dispatch({ type: "DEVOIR", payload: devoir });
    }
    if (eleve === state.eleve) {
      axios.get(ENDPOINT + `/api/notes/${id}`).then((res) => {
        setNotes((n) => res.data);
        setLoading(false);
      });
    }
  }, [id, devoir, eleve, dispatch, state.devoir, state.eleve]);

  if (isLoading) {
    return <div>Chargement...</div>;
  }

  return (
    <div className="correction">
      {Object.keys(questions).map((key) => {
        return (
          <div className="question" key={key}>
            {key} : <Latex>{questions[key].question}</Latex>
            <div className="radio-toolbar">
              {["NT", "0", "1", "2", "3", "4"].map((val) => {
                return (
                  <div className="radio-notes" key={`${key}+${val}`}>
                    <input
                      type="radio"
                      id={`${key}+${val}`}
                      name={key}
                      key={`input${key}+${val}`}
                      value={val}
                      defaultChecked={val === notes[key]}
                      onClick={() => handleUpdate(key, val)}
                    />
                    <label htmlFor={`${key}+${val}`} key={`label${key}+${val}`}>
                      {val}
                    </label>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Corrections;
