import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx'; 
import './index.css'; 

// Obtenemos el elemento donde se montará la aplicación
const rootElement = document.getElementById('root');

// Creamos el root de React (JavaScript estándar)
const root = createRoot(rootElement);

// Renderizamos la aplicación
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);