import axios from "axios";
const ENDPOINT = "https://correction-devoirs.herokuapp.com/api";

const setUser = (user) => dispatch;

const login = (username, password) => {
  return axios
    .post(ENDPOINT + "/login", { username: username, password: password })
    .then((res) => {
      SpeechS;
    });
};
