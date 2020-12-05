import React from "react";
import "./Header.css";
import axios from "axios";
import { AppContext } from "../AppContext";
import { navigate, Link } from "@reach/router";
const ENDPOINT = "https://correction-devoirs.herokuapp.com";

const Dropdown = ({ liste, onClick, name }) => {
  return (
    <li className="dropdown">
      <div className="navbar dropbtn">{name}</div>
      <div className="dropdown-content">
        {liste.map((key) => {
          return (
            <div key={key} className="navbar" onClick={() => onClick(key)}>
              {key}
            </div>
          );
        })}
      </div>
    </li>
  );
};

const Header = () => {
  const { state, dispatch } = React.useContext(AppContext);

  const handleSave = () => {
    if (Object.keys(state.toUpdate).length !== 0) {
      axios
        .post(ENDPOINT + "/api/notes", {
          devoir: state.devoir,
          eleve: state.eleve,
          notes: state.toUpdate,
        })
        .then((res) => dispatch({ type: "RESETUPDATE" }));
    }
  };

  const handleClickDevoir = (value) => {
    dispatch({
      type: "DEVOIR",
      payload: value,
    });
    if (state.devoir !== "Devoir" && value !== "Élève") {
      handleSave();
      navigate(`/corrections/${state.devoir}+${value}`);
    }
  };

  const handleClickEleve = (value) => {
    dispatch({
      type: "ELEVE",
      payload: value,
    });
    if (state.devoir !== "Devoir" && value !== "Élève") {
      handleSave();
      navigate(`/corrections/${state.devoir}+${value}`);
    }
  };

  return (
    <ul>
      <li>
        <Link
          className="navbar"
          to="/"
          onClick={() => {
            dispatch({
              type: "DEVOIR",
              payload: "Devoir",
            });
            dispatch({
              type: "ELEVE",
              payload: "Élève",
            });
          }}
        >
          Home
        </Link>
      </li>
      <Dropdown
        onClick={handleClickDevoir}
        name={state.devoir}
        liste={state.listeDS}
      />
      <Dropdown
        onClick={handleClickEleve}
        name={state.eleve}
        liste={state.listeEleves}
      />
      <li>
        <div
          className={
            Object.keys(state.toUpdate).length !== 0
              ? "navbar sauvegarde"
              : "navbar"
          }
          onClick={handleSave}
        >
          Sauvegarde
        </div>
      </li>
    </ul>
  );
};
export default Header;
