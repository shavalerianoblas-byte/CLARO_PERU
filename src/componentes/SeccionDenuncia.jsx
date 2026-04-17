import React from 'react';
import { ShieldAlert, Send } from 'lucide-react';

const SeccionDenuncia = () => {
  return (
    <div className="max-w-2xl mx-auto p-8 bg-gray-50 border-t-4 border-red-600 rounded-b-lg shadow-md">
      <div className="flex items-center gap-3 mb-6">
        <ShieldAlert className="text-red-600" size={30} />
        <h2 className="text-2xl font-bold text-gray-800">Canal de Ética y Denuncias</h2>
      </div>
      
      <p className="text-gray-600 mb-6 text-sm">
        Este espacio es confidencial. Úsalo para reportar conductas que afecten la integridad de nuestra comunidad Girls Tech o los valores de Claro.
      </p>

      <form className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700">Tipo de Incidencia</label>
          <select className="w-full p-3 border rounded-md focus:ring-2 focus:ring-red-500 outline-none">
            <option>Acoso o Discriminación</option>
            <option>Uso indebido de recursos</option>
            <option>Incumplimiento de normas de la Hackathon</option>
            <option>Otros</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700">Descripción detallada</label>
          <textarea rows="4" className="w-full p-3 border rounded-md focus:ring-2 focus:ring-red-500 outline-none" placeholder="Describe lo ocurrido con fechas y lugares..."></textarea>
        </div>

        <button type="submit" className="w-full bg-red-600 text-white font-bold py-3 rounded-md hover:bg-red-700 flex justify-center items-center gap-2 transition">
          <Send size={18} /> ENVIAR DENUNCIA DE FORMA SEGURA
        </button>
      </form>
    </div>
  );
};

export default SeccionDenuncia;