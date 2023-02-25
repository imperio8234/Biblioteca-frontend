import React, { useEffect, useState } from "react";
import userContext from "../context/userContext";
import  sweet from "sweetalert2"
import "./css/login.css"
import { Link } from "react-router-dom"
import { Home } from "./home";
import axios from "axios";

export const Login=()=>{
    const [user, setUser]=useState("")
    const [pass, setPass]=useState("")
    const [autentif, setAutentif]=useState(false);
    const [usuario, setUsuario]=useState("");
    const [token, setToken]=useState("");
  

    // peticion a la api
    const enviarapi= async ()=>{
      const url="https://lista-de-tareas-production.up.railway.app/login"
      const userPass={usuario:user, pass:pass}
      const configu={
        withCredentials:true,
        
      }
        try {
         const data= await axios.post(url,userPass,configu);
         console.log(data)
        if(data.data.success){
          setToken(data.data.user)
         setUsuario(data.data.usuario)
         setAutentif(data.data.success)
         
         document.querySelector(".formulario").style.display="none";
         document.querySelector(".con").style.display="none";  
        
        }else{
     
       sweet.fire({
       position: 'center',
       icon: 'error',
       title: `conntraseña o usuario incorrecto`,
       showConfirmButton: false,
       timer: 1500
         });
        }         
        } catch (error) {
         console.log(error)
         
        }
       };

       // boton para enviar info
       const submit=(e)=>{
    
        const usuario=e.target.elements[1].value;
         e.preventDefault()
         if (usuario==="") {
            alert("introduce algo valido")
         }else{
           enviarapi()
         }
        //se resetea el formulario y los estados
        e.target.reset();
        setPass("");
        setUser("");
       };

       //useefect alerta
useEffect(()=>{
    if (usuario=== "") {

    }else{
      sweet.fire({
        position: 'center',
    icon: 'success',
    title: `hola ${usuario}`,
    showConfirmButton: false,
    timer: 1500
      });
    }
    },[usuario]);
    //input para obtener usuario y texto
    const inUsuario=(e)=>{
        const usuario=e.target.value;
        setUser(usuario); 
      };

      const inpass=(e)=>{
        const pass=e.target.value;
        setPass(pass)
      };

      // usecontex valores
     const userData={
        name:usuario,
        token:token
      };


      return (
        <userContext.Provider value={userData}>
          
          <div className={autentif?"":"contenedor p-3 mb-2 bg-primary-subtle text-emphasis-primary"}>
          <div className="formulario">
            <form onSubmit={submit}>
              <fieldset>
                <legend>ingresa</legend>
                <label className="form-label" htmlFor="usuario">ingresa tu nombre</label>
                <input onChange={inUsuario} className="form-control" type={"text"} name="usuario"></input>
                <label className="form-label" htmlFor="pass" >contraseña</label>
                <input onChange={inpass} className="form-control" type={"password"} name="pass"></input>
                <input type={"submit"} value="ingresar" className="btn btn-dark sub" />
                <button className="btn btn-dark sub"><Link className="link" to={"/"}>registrarme</Link></button>
                 
              </fieldset>
            </form>
            <button  className="btn btn-dark sub olvi">olvidaste tu contraseña ?</button>
          
          
          </div>
            {autentif?<Home user={user} ></Home>:""}
        </div>

        </userContext.Provider>
        
        
    
       
      )
    };
