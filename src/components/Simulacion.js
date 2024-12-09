import React, { useState } from "react";
import { calcularNutricion } from "../services/api";
import "./Simulacion.css";

const Simulacion = () => {
  const [formData, setFormData] = useState({
    genero: "",
    peso: "",
    talla: "",
    edad: "",
    dias_tratamiento: "",
    factor_estres: "",
    suplemento_nombre: "", // Nuevo campo para el suplemento
  });
  const [datos, setDatos] = useState([]);
  const [resumenTotal, setResumenTotal] = useState(null);
  const [diaActual, setDiaActual] = useState(0);
  const [mostrarTablaFinal, setMostrarTablaFinal] = useState(false);
  const [tamanoCuerpo, setTamanoCuerpo] = useState(100);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const calcularResultados = async () => {
    try {
      setError(null);
      setDiaActual(0);
      setMostrarTablaFinal(false);
      const response = await calcularNutricion(formData);
      setDatos(response.resultadosPorDia);
      setResumenTotal(response.resumenTotal);

      const caloriasDia1 = response.resultadosPorDia[0]?.caloriasDia || 0;
      setTamanoCuerpo(Math.max(50, Math.min(caloriasDia1 / 50, 200)));
    } catch (err) {
      setError(err.error || "Ocurrió un error al calcular.");
    }
  };

  const avanzarDia = () => {
    if (diaActual < datos.length - 1) {
      setDiaActual((prev) => prev + 1);

      const caloriasDia = datos[diaActual + 1]?.caloriasDia || 0;
      setTamanoCuerpo(Math.max(50, Math.min(caloriasDia / 50, 200)));
    } else {
      setMostrarTablaFinal(true);
    }
  };

  const obtenerColorTorso = (porcentajeTolerancia) => {
    if (porcentajeTolerancia === 100) return "green";
    if (porcentajeTolerancia === 75) return "orange";
    return "red";
  };

  return (
    <div className="simulacion-container">
      <div className="datos-paciente">
        <h2>Datos del paciente</h2>
        <label>Edad:</label>
        <input
          type="number"
          name="edad"
          value={formData.edad}
          onChange={handleChange}
          placeholder="Edad"
        />

        <label>Peso (kg):</label>
        <input
          type="number"
          name="peso"
          value={formData.peso}
          onChange={handleChange}
          placeholder="Peso"
        />

        <label>Estatura (m):</label>
        <input
          type="number"
          name="talla"
          value={formData.talla}
          onChange={handleChange}
          placeholder="Estatura"
        />

        <label className="genero-container">Género:</label>
        <div className="radio-group">
          <label>
            <input
              type="radio"
              name="genero"
              value="Femenino"
              checked={formData.genero === "Femenino"}
              onChange={handleChange}
            />{" "}
            Femenino
          </label>
          <label>
            <input
              type="radio"
              name="genero"
              value="Masculino"
              checked={formData.genero === "Masculino"}
              onChange={handleChange}
            />{" "}
            Masculino
          </label>
        </div>

        <label>Días de alimentación enteral:</label>
        <input
          type="number"
          name="dias_tratamiento"
          value={formData.dias_tratamiento}
          onChange={handleChange}
          min="1"
          max="30"
          step="1"
          placeholder="Días"
        />

        <label>Factor de estrés:</label>
        <select
          name="factor_estres"
          value={formData.factor_estres}
          onChange={handleChange}
        >
          <option value="">Selecciona</option>
          <option value="1.2">Bajo</option>
          <option value="1.5">Moderado</option>
          <option value="1.7">Alto</option>
        </select>

        <label>Suplemento:</label>
        <select
          name="suplemento_nombre"
          value={formData.suplemento_nombre}
          onChange={handleChange}
        >
          <option value="">Selecciona un suplemento</option>
          <option value="Ensure Advance">Ensure Advance</option>
          <option value="Nutrición Plus">Nutrición Plus</option>
          <option value="FortiFit">FortiFit</option>
        </select>

        <button onClick={calcularResultados}>Calcular</button>
      </div>

      <div className="resultados">
        {error && <p className="error">{error}</p>}

        {!mostrarTablaFinal && diaActual < datos.length && (
          <>
            <div className="icono-cuerpo">
              <svg
                width="200"
                height="400"
                viewBox="0 0 200 400"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="100" cy="50" r="30" fill="#f4a261" />
                <rect
                  x={100 - tamanoCuerpo / 2}
                  y="80"
                  width={tamanoCuerpo}
                  height="150"
                  fill={obtenerColorTorso(datos[diaActual]?.porcentajeTolerancia)}
                />
                <rect x="70" y="230" width="20" height="120" fill="#f4a261" />
                <rect x="110" y="230" width="20" height="120" fill="#f4a261" />
                <rect
                  x={100 - tamanoCuerpo / 2 - 20}
                  y="100"
                  width="20"
                  height="80"
                  fill="#f4a261"
                />
                <rect
                  x={100 + tamanoCuerpo / 2}
                  y="100"
                  width="20"
                  height="80"
                  fill="#f4a261"
                />
              </svg>
            </div>

            <div className="tabla-datos-dia">
              <h3>Datos del Día {diaActual + 1}</h3>
              <p>Calorías: {datos[diaActual]?.caloriasDia}</p>
              <p>Suplemento (g): {datos[diaActual]?.suplementoGramos}</p>
              <p>Preparaciones: {datos[diaActual]?.preparaciones}</p>
              <p>
                Intervalo:{" "}
                {datos[diaActual]?.intervaloPreparaciones.horas}h{" "}
                {datos[diaActual]?.intervaloPreparaciones.minutos}m
              </p>
            </div>
          </>
        )}

        {mostrarTablaFinal && resumenTotal && (
          <div>
            <h2>Resumen Final</h2>
            <p>
              <strong>Gramos totales:</strong> {resumenTotal.gramosTotales} g
            </p>
            <p>
              <strong>Latas de 800g:</strong> {resumenTotal.latas800g}
            </p>
            <p>
              <strong>Latas de 400g:</strong> {resumenTotal.latas400g}
            </p>
            <table>
              <thead>
                <tr>
                  <th>Día</th>
                  <th>Calorías (Kcal)</th>
                  <th>Suplemento (g)</th>
                  <th>Preparaciones</th>
                  <th>Intervalo</th>
                </tr>
              </thead>
              <tbody>
                {datos.map((dato, index) => (
                  <tr key={index}>
                    <td>{dato.dia}</td>
                    <td>{dato.caloriasDia}</td>
                    <td>{dato.suplementoGramos}</td>
                    <td>{dato.preparaciones}</td>
                    <td>
                      {dato.intervaloPreparaciones.horas}h{" "}
                      {dato.intervaloPreparaciones.minutos}m
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {!mostrarTablaFinal && (
          <button onClick={avanzarDia}>
            {diaActual === datos.length - 1
              ? "Ver tratamiento total"
              : "Siguiente Día"}
          </button>
        )}
      </div>
    </div>
  );
};

export default Simulacion;
