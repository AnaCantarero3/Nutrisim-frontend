import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api", // Cambia esta URL si tu backend está en otro servidor o puerto
});

export const calcularNutricion = async (datos) => {
  try {
    const response = await api.post("/calculo/calcular", datos);
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: "Error desconocido" };
  }
};
