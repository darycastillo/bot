const axios = require("axios");

const BASE_URL = "http://localhost:8000";

const getCursosByCarnet = async (carnet) => {
  const {
    data: {
      Estudiantes: { cursos },
    },
  } = await axios({
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

  return cursos
    .map((curso, index) => `📚 ${index + 1}. ${curso.Curso_nombre}`)
    .join("\n\n");
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
  return Nota.reduce((acc, val, index) => {
    const { Curso_nombre } = val.id_curso;
    const { nota } = val;

    acc.push(`📝 ${index + 1} ${Curso_nombre}: ${nota}`);
    return acc;
  }, []).join("\n\n");
};

module.exports = {
  getCursosByCarnet,
  getNotasByCarnet,
};
