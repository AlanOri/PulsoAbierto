# Pulso Abierto

Aplicación web desarrollada con React y TypeScript para consultar en tiempo real las cotizaciones de Bitcoin, Ethereum y Solana, visualizar el detalle de cada criptomoneda, gestionar una lista persistente de favoritos y realizar búsquedas filtradas mediante un formulario controlado.

## Despliegue en producción

* **URL de la aplicación publicada en Vercel:** [https://pulso-abierto-mu.vercel.app](https://pulso-abierto-mu.vercel.app)
* **Repositorio en GitHub:** [https://github.com/AlanOri/PulsoAbierto](https://github.com/AlanOri/PulsoAbierto)

## Tecnologías principales

* **React + TypeScript** (construido con **Vite**)
* **React Router** (enrutamiento entre el listado principal y las vistas de detalle)
* **Zustand** (administración del estado global y persistencia de favoritos en `localStorage`)
* **Zod** (validación de esquemas del formulario controlado)
* **Vitest + Testing Library** (pruebas automatizadas sobre servicios y estado global)
* **Vercel** (despliegue continuo en producción)

## Instalación y ejecución local

1. **Clonar el repositorio e instalar las dependencias:**
   ```bash
   git clone https://github.com/AlanOri/PulsoAbierto.git
   cd PulsoAbierto
   npm install
   ```

2. **Ejecutar la aplicación en entorno de desarrollo:**
   ```bash
   npm run dev
   ```

3. **Ejecutar las pruebas automatizadas:**
   ```bash
   npm run test
   ```

4. **Ejecutar el análisis de código (lint):**
   ```bash
   npm run lint
   ```

5. **Generar el build de producción:**
   ```bash
   npm run build
   ```

6. **Comprobar el build productivo localmente mediante preview:**
   ```bash
   npm run preview
   ```

## Mejora de mantenibilidad realizada

* **Problema identificado:** Existía estado local y props redundantes para gestionar favoritos (`onToggleFavorite` en `CryptoList.tsx` y la función local `handleToggleFavorite` en `HomePage.tsx`) que duplicaban la lógica ya centralizada en el store global de Zustand (`useCryptoStore`), provocando además una desincronización al filtrar por criptomonedas favoritas.
* **Cambio realizado:** Se eliminaron las props y el estado local obsoletos de favoritos en `HomePage.tsx` y `CryptoList.tsx`, conectando el filtrado directamente con el estado `favorites` de `useCryptoStore`, y se normalizó el estado inicial de la moneda seleccionada en minúsculas (`'usd'`) para mantener coherencia con la validación de Zod.
* **Comprobación sin regresiones:** Se ejecutaron las pruebas automatizadas (`npm run test`), la verificación de tipos y generación del build (`npm run build`), y se comprobó manualmente en el navegador el marcado, filtrado y persistencia de favoritos tras recargar la aplicación.

## Verificación final

* **Pruebas ejecutadas:** `npm run test` ejecutado correctamente sin errores.
* **Build generado correctamente:** `npm run build` completado con éxito generando la carpeta `dist/`.
* **Preview comprobado:** Versión productiva validada localmente mediante `npm run preview` (carga inicial, consultas a la API, navegación principal, favoritos y consola sin errores bloqueantes).
* **Despliegue realizado:** Publicado en Vercel (`https://pulso-abierto-mu.vercel.app`) y verificado en producción (consulta a la API, navegación y recarga directa en rutas de detalle, persistencia de favoritos, uso del formulario y vista responsiva móvil/escritorio).
* **Fecha de verificación:** 24/11/2026