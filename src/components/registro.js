import {React, useState} from "react";
import {Link, useNavigate} from "react-router-dom"



function Registro(){
  const navigate=useNavigate();

    const [user, setUser]=useState("");
    const [pass, setPass]=useState("");


    const enviarapi= async ()=>{
      try {
        const res= await fetch("https://lista-de-tareas-production.up.railway.app",{
          method:"POST",
          body:JSON.stringify(
            {
              "usuario":user,
              "pass":pass,
            }),
            credentials: 'include',
            headers:{
              "content-type":"application/json"
            }
        });
        const datoss= await res.json();
        if (datoss.success) {
         navigate("/login")
          
        }
        
      } catch (error) {

        console.log(error)
        
      }
     

    }


    const env=(e)=>{
        e.preventDefault()
    
    
        if (e.target.elements[2].value && e.target.elements[1].value) {
            enviarapi()
        }else{

        };

       e.target.reset()
        setUser("");
        setPass("")
    }

    const usuarioE=(e)=>{
        if (e.target.value === "") {
          
        }else{
              const usuario=e.target.value;
             setUser(usuario)
            
        }

    }

    const passE=(e)=>{
       if (e.target.value==="") {
        
       }else{
        const pass=e.target.value;
        setPass(pass);
       }
    }



    return (
        <div className="contenedor p-3 mb-2 bg-primary-subtle text-emphasis-primary">
        <div className="formulario">
          <form onSubmit={env}>
            <fieldset>
              <legend>registrarme</legend>
              <label className="form-label" for="usuario">registra tu usuario</label>
              <input onChange={usuarioE} className="form-control" type={"text"} name="usuario"></input>
              <label className="form-label" for="pass">elige una contraseña</label>
              <input onChange={passE} className="form-control" type={"password"} name="pass"></input>
              <input type={"submit"} value="guardar usuario" className="btn btn-dark sub" />
              <button className="btn btn-dark sub"><Link className="link" to={"/"}>login</Link></button>
             
            </fieldset>
          </form>
          
  
        </div>
      </div>
    )
};

export default Registro;