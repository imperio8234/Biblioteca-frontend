import { Link } from "react-router-dom";
import './App.css';
import { useState, useEffect} from "react"
import "../src/components/css/principal.css"
import "../node_modules/bootstrap/dist/css/bootstrap.css"

function App() {
  //instalacion
  const [isReadyForInstall, setIsReadyForInstall] = useState(false);

useEffect(() => {
  window.addEventListener("beforeinstallprompt", (event) => {
    // Prevent the mini-infobar from appearing on mobile.
    event.preventDefault();
    console.log("👍", "beforeinstallprompt", event);
    // Stash the event so it can be triggered later.
    window.deferredPrompt = event;
    // Remove the 'hidden' class from the install button container.
    setIsReadyForInstall(true);
  });
}, []);

//BOTON DE INSTALACION
async function downloadApp() {
  console.log("👍", "butInstall-clicked");
  const promptEvent = window.deferredPrompt;
  if (!promptEvent) {
    // The deferred prompt isn't available.
    console.log("oops, no prompt event guardado en window");
    return;
  }
  // Show the install prompt.
  promptEvent.prompt();
  // Log the result
  const result = await promptEvent.userChoice;
  console.log("👍", "userChoice", result);
  // Reset the deferred prompt variable, since
  // prompt() can only be called once.
  window.deferredPrompt = null;
  // Hide the install button.
  setIsReadyForInstall(false);
} 
  return (
    <div className="contenedor p-3 mb-2 bg-primary-subtle text-emphasis-primary">
    {isReadyForInstall && <button onClick={downloadApp} >descargar</button>}

  <div className="contenedorBtn">
      <h2>bienvenido a tu biblioteca</h2>
    <div className='cont-botones'>
    <button className="btn btn-outline-dark boton m-3"><Link className="link" to="/login">ingresar</Link></button>
    <button className="btn btn-outline-dark boton"><Link className="link" to="/registro">registro</Link></button>


    </div>
  </div>

</div>
  );
}

export default App;
