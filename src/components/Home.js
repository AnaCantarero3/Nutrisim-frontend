import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faInfoCircle, faAppleAlt, faHeart, faTint, faLemon } from '@fortawesome/free-solid-svg-icons';
import './Home.css';

const Home = () => {
  const navigate = useNavigate(); 

  return (
    <div className="home-container">
      <div className="icon-container">
        <FontAwesomeIcon icon={faAppleAlt} className="decorative-icon apple" />
        <FontAwesomeIcon icon={faHeart} className="decorative-icon heart" />
        <FontAwesomeIcon icon={faTint} className="decorative-icon water" />
        <FontAwesomeIcon icon={faLemon} className="decorative-icon lemon" />
      </div>

      <h1 className="title">NutriSim</h1>
      <p className="subtitle">Simulador de Cálculo y Gestión Nutricional</p>
      <div className="button-container">
        <button className="button simulate-button" onClick={() => navigate('/simulacion')}>
          <FontAwesomeIcon icon={faPlay} className="icon" /> Comenzar a simular
        </button>
        <button className="button about-button" onClick={() => navigate('/sobresimulador')}>
          <FontAwesomeIcon icon={faInfoCircle} className="icon" /> Sobre el simulador
        </button>
      </div>
    </div>
  );
};

export default Home;