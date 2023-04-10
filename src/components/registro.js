import {React, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import sweet from "sweetalert2";



function Registro(){
  const navigate=useNavigate();

    const [user, setUser]=useState("");
    const [pass, setPass]=useState("");
    const [email, setEmail]=useState("");

    const enviarapi= async ()=>{
    
       try {
        const res= await fetch("http://localhost:4000",{
          method:"POST",
          body:JSON.stringify(
            {
              "usuario":user,
              "pass":pass,
              "email":email
            }),
            credentials: 'include',
            headers:{
              "content-type":"application/json"
            }
        });


        const datoss= await res.json();
        if (datoss.success) {
         navigate("/login");
        }else{
          // alerta de usuario ya registrado 
          sweet.fire({
            position: 'center',
            icon: 'error',
            title: `el usuario ya existe`,
            showConfirmButton: false,
            timer: 1500
              });
        }
        
      } catch (error) {
        console.log(error) 
      }
    };

// input 
    const env=(e)=>{
        e.preventDefault()
        if (e.target.elements[2].value && e.target.elements[1].value) {
            enviarapi()
        }else{
        };
       e.target.reset()
        setUser("");
        setPass("");
        setEmail("");
    };

    const usuarioE=(e)=>{
        if (e.target.value === "") {    
        }else{
              const usuario=e.target.value;
             setUser(usuario)            
        }
    };

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
              <label className="form-label" htmlFor="usuario">registra tu usuario</label>
              <input required onChange={usuarioE} className="form-control" type={"text"} name="usuario"></input>
              <label className="form-label" htmlFor="email">ingresa tu correo</label>
              <input required onChange={e=>{setEmail(e.target.value)}} className="form-control" type={"email"} name="email"></input>
              <label className="form-label" htmlFor="pass">elige una contraseña</label>
              <input required onChange={passE} className="form-control" type={"password"} name="pass"></input>
              <input type={"submit"} value="guardar usuario" className="btn btn-dark sub" />
              <button className="btn btn-dark sub"><Link className="link" to={"/"}>login</Link></button>
             
            </fieldset>
          </form>
          
  
        </div>
      </div>
    )
};

export default Registro;