import axios from "axios";
import { useState } from "react"
import sweet from "sweetalert2";
import {useNavigate} from "react-router-dom";

export const RecuperarContraseña=()=>{

    const navega=useNavigate();

    const [email, setEmail]=useState();
    const [pass, setPass]=useState();

    //enviar a api
    const enviarApi= async()=>{
        const enviarInfo={
            email:email,
            pass:pass
        }
       await axios.post("http://localhost:4000/login/cambio", enviarInfo)
        .then(e=>{
            sweet.fire({
                position: 'center',
                icon: 'success',
                title: `cambio de contraseña exitoso`,
                showConfirmButton: false,
                timer: 1000
                  });
                  navega("/login")
        })
        .catch(e=>console.log(e))
    }


    return(
       <div className="vw-100 vh-100 d-flex aling-items-center bg-dark text-light-emphasis justify-content-center align-items-center text-center">
         <div className=" ">
            <form className="">
                <label htmlFor="email">introduce tu correo</label>
                <input onChange={e=>setEmail(e.target.value)} className="form-control" required id="email" name="email" type={"email"}></input>
                <label className="text-light-emphasis" htmlFor="contraseña">contraseña nueva</label>
                <input onChange={e=>setPass(e.target.value)} className="form-control" required id="contraseña" name="contraseña" type={"password"}></input>
                <button onClick={e=>{e.preventDefault(); enviarApi()}}  className="btn btn-primary mt-2 ">actualizar contraseña</button>

            </form>

        </div>
       </div>
    )

}