const axios = require("axios");

const BASE_URL = "http://localhost:8000";

const getCursos = (yourName) =>
  axios({
    method: "GET",
    url: `${BASE_URL}/proyectfinal/api/Cursos`,
    headers: {
      "content-type": "application/json",
    } /* ,
    params: {
      fname: yourName,
      sname: partnerName,
    }, */,
  });

module.exports = {
  getCursos,
};
