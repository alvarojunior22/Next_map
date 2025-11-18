import dynamic from 'next/dynamic';
import React from 'react';

// Carga dinámica del Client Component (MapComponent).
// Quitamos 'ssr: false' porque el componente ya tiene 'use client'.
const DynamicMap = dynamic(
  () => import('../components/map').then((mod) => mod.default),
  {
    loading: () => (
      <div className="flex items-center justify-center w-full h-screen bg-gray-50 text-gray-500">
        <p className="p-4 text-lg font-medium">Cargando mapa...</p>
      </div>
    ),
  }
);

// Este es el Server Component raíz (no tiene 'use client')
const HomePage: React.FC = () => {
  return (
    <main className="w-screen h-screen">
      <DynamicMap />
    </main>
  );
};

export default HomePage;