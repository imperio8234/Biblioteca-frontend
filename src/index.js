import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import { createBrowserRouter, RouterProvider  } from "react-router-dom";

import { Login } from './components/login';
import Registro from './components/registro';
import { Agregar} from "./components/agregar"
import { Contenido } from "./components/homeContent";
import { Perfil } from './components/componentesSegund.js/perfil';
import { RecuperarContraseña } from './components/componentesSegund.js/recuperacion de contraseña/recuperacion';
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";

const router=createBrowserRouter([
  {
    path:"/",
    element:<App />
  },
  {
    path:"/login",
    element:<Login />,
    children:[
      {
        path:"perfil",
        element:<Perfil />

      },
        {
          path:"contenido",
          element:<Contenido></Contenido>
        },
        {
          path:"agregar",
          element:<Agregar />
  
        }
  
      ]
    
  
  },
 
  {
    path:"/registro",
    element:<Registro></Registro>
  },{
    path:"/recoverePasword",
    element:<RecuperarContraseña />
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

serviceWorkerRegistration.register({
  onUpdate: async (registration) => {
    // Corremos este código si hay una nueva versión de nuestra app
    // Detalles en: https://developers.google.com/web/fundamentals/primers/service-workers/lifecycle
    if (registration && registration.waiting) {
      await registration.unregister();
      registration.waiting.postMessage({ type: "SKIP_WAITING" });
      // Des-registramos el SW para recargar la página y obtener la nueva versión. Lo cual permite que el navegador descargue lo nuevo y que invalida la cache que tenía previamente.
      window.location.reload();
    }
  },
});

