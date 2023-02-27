import { Link , Outlet } from "react-router-dom"
import {  useState } from "react";
import "./css/local.css"
import { Buscador } from "./componentesSegund.js/buscador";
import  sweet from "sweetalert2";

export const Home=(  )=>{

    const [buscadorConte, setBuscadorConte]=useState(false)
    const [inputText, setInputText]=useState("");

   
  

    //cerrar session y 
    const cerr= async()=>{
        try { const res= await fetch("http://localhost:4000/cerrar",{
          method:"POST",
          body:"",
          credentials: 'include',
          headers:{
            "content-type":"application/json"
          }
        })
        const dat= await res.json();
        if(dat){
          sweet.fire({
            position: 'center',
            icon: 'success',
            title: `vuelve pronto`,
            showConfirmButton: false,
            timer: 1500
              });
              localStorage.removeItem("token")
        }
          
        } catch (error) {
          console.log(error)
          
        }
       };

      // implementacion del buscador
      //implementacion del buscador
 const buscarInput=(e)=>{
    setInputText(e.target.value)
    if (inputText.length <= 1) {
      setBuscadorConte(false)
    }else{
      setBuscadorConte(true)
    }
   };

   const buscar=(e)=>{
    e.preventDefault()
   
   };

   return(

    <div>
      {/* bara de navegacion*/ }
        <nav className="navbar bg-dark nave" onClick={()=>setBuscadorConte(false)}>
            
                <ul class="botonesnav">
                     <li ><Link className="btn btn-outline-success me-2"to={"contenido"}>contenido</Link></li>
                     <li ><Link className="btn btn-sm btn-outline-secondary" to={"agregar"}>agregar</Link></li>
                     <li onClick={cerr}  ><Link  class="btn btn-outline-success" to={"/"}>cerrar</Link></li>
                </ul>
  
                 <form class="form" role="search">
                    <input onChange={buscarInput} className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                    <button onClick={buscar} className="btn btn-outline-success" type="submit">buscar</button>
                 </form>
            
         </nav>
         
      
      
      {/*aqui se muestra el contenido guardado */}
      <div id="detail" onClick={()=>setBuscadorConte(false)}>
        <Outlet></Outlet>
        {buscadorConte &&<Buscador inputText={inputText}></Buscador>}
  
      </div>
  
     </div>
    )
  };