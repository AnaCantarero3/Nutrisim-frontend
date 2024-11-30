import React from "react";
import './SobreSimulador.css'; 

const SobreSimulador = () => {
  return (
    <section id="sobre-simulador" className="sobre-simulador py-16">
      <div className="container mx-auto px-6 lg:px-20">
        <h2 className="title">Sobre el Simulador NutriSim</h2>
        <div className="grid-container">
          <div className="text-section">
            <p>
              NutriSim es una herramienta diseñada para optimizar los cálculos y ajustes de
              nutrición enteral en pacientes hospitalizados. Este simulador automatiza los cálculos
              nutricionales más complejos, como la Tasa Metabólica Basal (TMB), los factores de
              actividad y estrés clínico, así como el aporte de las fórmulas administradas.
            </p>
            <p>
              Desarrollado por un equipo multidisciplinario de estudiantes de Ingeniería en Sistemas
              y Nutrición, NutriSim busca reducir errores humanos, mejorar la precisión de los
              cálculos y facilitar la toma de decisiones en tiempo real para médicos y nutricionistas.
            </p>
            <p>
              Además, el simulador ofrece simulaciones dinámicas que permiten evaluar la duración
              estimada de los productos administrados, promoviendo una administración eficiente y
              segura de la nutrición enteral.
            </p>
          </div>
          <div className="goals-section">
            <h3 className="sub-title">Objetivos del Proyecto</h3>
            <ul className="goals-list">
              <li>Automatizar los cálculos de la nutrición basal con fórmulas estándar.</li>
              <li>Incorporar simulaciones dinámicas para visualizar la duración de tratamientos.</li>
              <li>Optimizar la rectificación nutricional según cambios en el estado del paciente.</li>
              <li>Proporcionar información clara al paciente sobre su tratamiento nutricional.</li>
              <li>Mejorar la eficiencia hospitalaria y reducir la carga administrativa.</li>
            </ul>
          </div>
        </div>
        <div className="impact-section">
          <h3 className="sub-title">Impacto del Simulador</h3>
          <p className="impact-text">
            NutriSim reducirá los errores humanos, acelerará los procesos de cálculo y permitirá
            decisiones más rápidas en situaciones de emergencia. Este simulador no solo beneficiará
            al personal médico y nutricionista, sino que también ayudará a los pacientes a entender
            mejor su tratamiento nutricional, contribuyendo a su recuperación y bienestar.
          </p>
        </div>
      </div>
    </section>
  );
};

export default SobreSimulador;