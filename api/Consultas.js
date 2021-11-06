const axios = require("axios");

const BASE_URL = process.env.API;

const getCursosByCarnet = async (carnet) => {
  const { data } = await axios({
    method: "GET",
    url: `${BASE_URL}/proyectfinal/api/Estudiante`,
    headers: {
      "content-type": "application/json",
    },
    params: {
      carnet,
      manyFields: true,
    },
  });

  const cursos = data.Estudiantes?.cursos;
  let result = "";
  if (!cursos || !cursos.length) {
    result = `No existen cursos para el carnet: ${carnet}`;
  } else {
    result = cursos
      .map((curso, index) => `📚 ${index + 1}. ${curso.Curso_nombre}`)
      .join("\n\n");
  }

  return result;
};

const getNotasByCarnet = async (carnet) => {
  const {
    data: { Nota },
  } = await axios({
    method: "GET",
    url: `${BASE_URL}/proyectfinal/api/Nota`,
    headers: {
      "content-type": "application/json",
    },
    params: {
      carnet,
    },
  });

  let result = "";
  if (!Object.keys(Nota).length) {
    result = `No existen notas para el carnet: ${carnet}`;
  } else {
    result = Nota.reduce((acc, val, index) => {
      const { Curso_nombre } = val.id_curso;
      const { nota } = val;

      acc.push(`📝 ${index + 1} ${Curso_nombre}: ${nota}`);
      return acc;
    }, []).join("\n\n");
  }
  return result;
};

module.exports = {
  getCursosByCarnet,
  getNotasByCarnet,
};
