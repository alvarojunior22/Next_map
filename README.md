🚌 Proyecto de Rastreo de Buses en Tiempo Real (Bus Tracker PoC)

📍 Introducción

Este proyecto es una Prueba de Concepto (PoC) para una aplicación de rastreo de buses en tiempo real, construida sobre la plataforma Next.js con el App Router y el uso extensivo de Componentes de Cliente para manejar la interactividad del mapa y la geolocalización.

El objetivo principal es demostrar:

La integración segura de la API de Google Maps.

La obtención de la ubicación del usuario mediante la API de Geolocalización del navegador.

La visualización de múltiples marcadores (buses simulados) de alto rendimiento en el mapa.

🛠️ Tecnologías Utilizadas

Tecnología

Propósito

Next.js

Framework de React para el desarrollo Full-Stack.

React

Componentes de la interfaz de usuario.

TypeScript

Lenguaje de programación para tipado estático y robustez del código.

Tailwind CSS

Framework CSS para un estilo rápido y responsivo.

Google Maps API

Servicios de mapas y geolocalización.

@react-google-maps/api

Hooks y componentes de React para la integración con Google Maps.

🏗️ Arquitectura del Proyecto

El proyecto sigue una arquitectura moderna de Next.js App Router, dividiendo el código en Componentes de Servidor (Server Components) y Componentes de Cliente (Client Components).

Componentes Clave

Archivo

Tipo

Descripción

app/page.tsx

Server Component

La página raíz, que se encarga de la Carga Dinámica (next/dynamic) del componente de mapa.

components/Map.tsx

Client Component ("use client")

El corazón de la aplicación. Contiene la lógica del mapa, el hook de geolocalización, el estado de los íconos (useState) y la renderización de marcadores.

hooks/useGeolocation.ts

Lógica de Cliente

Hook personalizado para acceder a la API navigator.geolocation del navegador.

public/bus-icon.svg

Asset Estático

El ícono vectorial del bus, cargado como un recurso estático del servidor.

Diagrama de Flujo (Client-Server)

Server (app/page.tsx): Renderiza el placeholder de carga (loading) y le indica al cliente que descargue el DynamicMap.

Client (components/Map.tsx):

Ejecuta useJsApiLoader para descargar el script de Google Maps.

Ejecuta useGeolocation para obtener la posición del usuario.

Cuando la API de Google Maps está lista (isLoaded), inicializa el busIcon de forma segura.

Renderiza el <GoogleMap> con los marcadores simulados y el marcador del usuario.

⚙️ Configuración y Ejecución

Sigue estos pasos para levantar el proyecto localmente.

1. Clave de API de Google Maps

Este proyecto requiere una clave de API válida para funcionar.

Obtén una clave de API de Google Cloud y habilita las siguientes APIs:

Maps JavaScript API

Geolocation API

Crea un archivo llamado .env.local en la raíz del proyecto.

Agrega tu clave API de la siguiente manera:

NEXT_PUBLIC_GOOGLE_MAPS_API_KEY="TU_CLAVE_API_AQUÍ"