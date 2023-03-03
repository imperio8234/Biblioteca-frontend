import { Link , Outlet } from "react-router-dom"
import {  useEffect, useState, useContext } from "react";
import "./css/local.css"
import { Buscador } from "./componentesSegund.js/buscador";
import  sweet from "sweetalert2";
import axios from "axios";
import userContext from "../context/userContext";




export const Home=(  )=>{

  const {token}=useContext(userContext);

    const [buscadorConte, setBuscadorConte]=useState(false)
    const [inputText, setInputText]=useState("");
    const [enviBuscar, setEnviBuscar]=useState(false);
    const [datos, setDatos]=useState(null);
   

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
              localStorage.removeItem("user")
        }
          
        } catch (error) {
          console.log(error)
          
        }
       };

      // implementacion del buscador
      const getFoto= async()=>{
        await  axios.get("http://localhost:4000/foto",{
              headers:{
                  Authorization: `Bearer ${token}`
              }
          }).then(res=>{
              const imagen=res.data.id + res.data.nombre;
              
      
              setDatos(imagen)
          })
          .catch(err=>{
              console.log(err)
          })
          
      
      };
      //implementacion del buscador
 const buscarInput=(e)=>{
    setInputText(e.target.value)
    
    if (inputText.length <= 1) {
      setBuscadorConte(false)
      setEnviBuscar(false)
    }else{
      setBuscadorConte(true)
      
    }
   };

   const buscar=(e)=>{
   e.preventDefault()
   setEnviBuscar(true);
   
   };
   useEffect(()=>{
    setEnviBuscar(false);

   }, [inputText]);

   
  

  useEffect(()=>{
    getFoto();
// eslint-disable-next-line
   }, [])

   return(

    <div>
      {/* bara de navegacion*/ }
        <nav className="navbar bg-dark nave">
         <Link to={"perfil"}> <img title="perfil" className="imgPerfil" alt="no hay imagen" src={"http://localhost:4000/"+ datos} ></img></Link>
            
                <ul class="botonesnav">
                     <li ><Link className="btn btn-outline-success me-2"to={"contenido"}>contenido</Link></li>
                     <li ><Link className="btn btn-sm btn-outline-secondary" to={"agregar"}>agregar</Link></li>
                     <li onClick={cerr}  ><Link  class="btn btn-outline-success" to={"/"}>cerrar</Link></li>
                </ul>
  
                 <form className="form" role="search">
                    <input onChange={buscarInput} className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                    <button onClick={buscar} className="btn btn-outline-success">buscar</button>
                 </form>
            
         </nav>
         
      
      
      {/*aqui se muestra el contenido guardado */}
      <div id="detail" onClick={()=>setBuscadorConte(false)}>
       <Outlet></Outlet>
        {buscadorConte &&<Buscador inputText={inputText} enviBuscar={enviBuscar}></Buscador>}
  
      </div>
  
     </div>
    )
  };