import React, { useEffect, useState } from "react";
import userContext from "../context/userContext";
import  sweet from "sweetalert2";
import "./css/login.css"
import { Link } from "react-router-dom"
import { Home } from "./home";
import axios from "axios";
import { RecoverPass } from "./componentesSegund.js/recuperacion de contraseña/recoverPass";


export const Login=()=>{
  //hook use state

    const [user, setUser]=useState("")
    const [pass, setPass]=useState("")
    const [usuario, setUsuario]=useState("");
    const [token, setToken]=useState("");
    const [RecoverEDPass, setRecoverPass]=useState(false)
  

    // peticion a la api
    const enviarapi= async ()=>{
      const url="http://localhost:4000/login"
      const userPass={usuario:user, pass:pass}
      const configu={
        withCredentials:true,
        
      }
        try {
         const data= await axios.post(url,userPass,configu);
         console.log(data)
        if(data.data.success){
          localStorage.setItem("token",data.data.user )
         setUsuario(data.data.usuario)
         localStorage.setItem("user", data.data.usuario)
       //  document.querySelector(".formulario").style.display="none";
         //document.querySelector(".con").style.display="none"; 
       
        
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
         if(error){
          sweet.fire({
            position: 'center',
            icon: 'error',
            title: `conntraseña o usuario incorrecto`,
            showConfirmButton: false,
            timer: 1500
              });

         }
         
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
  const getuser=localStorage.getItem("user")
  const gettoken=localStorage.getItem("token");
  if(gettoken){
    setToken(gettoken)
  }

    if (usuario === "") {

    }else{
      // mostrar alerta 
      sweet.fire({
        position: 'center',
    icon: 'success',
    title: `hola ${getuser}`,
    showConfirmButton: false,
    timer: 1500
      });
     
    };
    
    },[usuario, token]);
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

      // recargar la pagina
            
          window.addEventListener("load", ()=>{
            console.log("pagina recargada")
          });

          //cerrar modal
          const modalClosed=(cerrar)=>{
            setRecoverPass(cerrar)

          }

      return (
        <userContext.Provider value={userData}>
          
          <div className={token?"":"contenedor p-3 mb-2 bg-primary-subtle text-emphasis-primary"}>
          <div className={token?"displ":"formulario"}>
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
            
            
            {/*recuperar contraseña*/}
            <button onClick={()=>setRecoverPass(true)}  className="btn btn-dark sub olvi">olvidaste tu contraseña ?</button>

            
          </div>
            {token && <Home ></Home>}
      </div>
      {RecoverEDPass && <RecoverPass modalClosed={modalClosed} setmodal={RecoverEDPass}  />}

        </userContext.Provider>
        
        
    
       
      )
    };
