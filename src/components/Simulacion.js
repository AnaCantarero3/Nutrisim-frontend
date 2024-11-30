import React, { useState } from "react";
import "./Simulacion.css";

const Simulacion = () => {
  const [datos, setDatos] = useState([]);
  const [tamanoCuerpo, setTamanoCuerpo] = useState(100); 

  const calcularResultados = () => {
    const nuevosDatos = [
      { dia: 1, calorias: 20, kcal: 500, polvo: 1, preparaciones: 2, agua: 500, intervalo: "4 horas" }, //datos de ejemplo
      { dia: 2, calorias: 30, kcal: 600, polvo: 1.5, preparaciones: 3, agua: 600, intervalo: "3 horas" },
    ];
    setDatos(nuevosDatos);

    const totalCalorias = nuevosDatos.reduce((total, item) => total + item.kcal, 0);
    setTamanoCuerpo(Math.max(50, Math.min(totalCalorias / 50, 200))); 
  };

  return (
    <div className="simulacion-container">
      <div className="datos-paciente">
        <h2>Datos del paciente</h2>
        <label>Edad:</label>
        <input type="number" placeholder="Edad" />

        <label>Peso (kg):</label>
        <input type="number" placeholder="Peso" />

        <label>Estatura (cm):</label>
        <input type="number" placeholder="Estatura" />

        <label className="genero-container">Género:</label>
        <div className="radio-group">
          <label>
            <input type="radio" name="genero" value="femenino" /> Femenino
          </label>
          <label>
            <input type="radio" name="genero" value="masculino" /> Masculino
          </label>
        </div>

        <label>Días de alimentación enteral:</label>
        <input type="number" min="1" max="30" step="1" placeholder="Días" />

        <label>Suplemento:</label>
        <select>
          <option value="ensure">Ensure</option>
          <option value="ensure-advance">Ensure Advance</option>
        </select>

        <label>Factor de estrés:</label>
        <select>
          <option value="bajo">Bajo</option>
          <option value="moderado">Moderado</option>
          <option value="alto">Alto</option>
        </select>

        <button onClick={calcularResultados}>Calcular</button>
      </div>

      <div className="resultados">
        {/* Representación del cuerpo */}
        <div className="icono-cuerpo">
          <svg
            width="200"
            height="400"
            viewBox="0 0 200 400"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Cabeza */}
            <circle cx="100" cy="50" r="30" fill="#f4a261" />
            {/* Torso dinámico */}
            <rect
              x={100 - tamanoCuerpo / 2}
              y="80"
              width={tamanoCuerpo}
              height="150"
              fill="#f4a261"
            />
            {/* Piernas */}
            <rect x="70" y="230" width="20" height="120" fill="#f4a261" />
            <rect x="110" y="230" width="20" height="120" fill="#f4a261" />
            {/* Brazos */}
            <rect x={100 - tamanoCuerpo / 2 - 20} y="100" width="20" height="80" fill="#f4a261" />
            <rect x={100 + tamanoCuerpo / 2} y="100" width="20" height="80" fill="#f4a261" />
          </svg>
        </div>

        {/* Tabla de resultados */}
        <table>
          <thead>
            <tr>
              <th>Día</th>
              <th>Calorías (%)</th>
              <th>Calorías (Kcal)</th>
              <th>Polvo (kg)</th>
              <th>Preparaciones</th>
              <th>Agua (ml)</th>
              <th>Intervalo</th>
            </tr>
          </thead>
          <tbody>
            {datos.map((dato, index) => (
              <tr key={index}>
                <td>{dato.dia}</td>
                <td>{dato.calorias}%</td>
                <td>{dato.kcal}</td>
                <td>{dato.polvo} kg</td>
                <td>{dato.preparaciones}</td>
                <td>{dato.agua} ml</td>
                <td>{dato.intervalo}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Simulacion;