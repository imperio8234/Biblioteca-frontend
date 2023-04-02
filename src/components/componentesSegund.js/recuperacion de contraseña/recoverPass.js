import "../../../../node_modules/bootstrap/dist/js/bootstrap.bundle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faXmark} from "@fortawesome/free-solid-svg-icons"
import { useState } from "react";
import axios from "axios";
import sweet from "sweetalert2";


export const RecoverPass=({ setmodal, modalClosed })=>{

    // estados 
    const [email, setEmail]=useState();
    

    //enviar informacion a la api
    const sendapi= async ()=>{
       
        const sendemail={userEmail:email}
        await axios.post("https://lista-de-tareas-production.up.railway.app/login/newpass", sendemail)
        .then(res=>{if (res.data.success === true) {
            console.log()
            document.querySelector(".formRecover").elements[1].value="";
            sweet.fire({
                position: 'center',
                icon: 'success',
                title: `revisa tu correo`,
                showConfirmButton: false,
                timer: 3000
                  });
                  closeModal(false)
            
        }})
        .catch(err=>{
            if (err) {
                document.querySelector(".formRecover").elements[1].value="";
            sweet.fire({
                position: 'center',
                icon: 'error',
                title: `usuario no registrado`,
                showConfirmButton: false,
                timer: 3000
                  });
                  closeModal(false)
                
            }

        });
    };

//funcion para cerrar modal 
    const closeModal=(close)=>{
        modalClosed(close)
    }

    return (

        <div className="contenedorModal position-absolute top-0 left-50 vw-100 vh-100 d-flex justify-content-center bg-dark bg-opacity-50 align-items-center flex-column" >
            <FontAwesomeIcon onClick={()=>closeModal(false)} icon={faXmark} className={"fs-1 text-dark m-4"} role="button" ></FontAwesomeIcon>

            <div className="containerForm text-center w-75 h-50">
                <form className="form-control formRecover">
                    <fieldset>
                       <legend className="form-label">recupera tu contraseña</legend>
                       <label htmlFor="email" className="form-label" >ingresa el correo con el que te registraste</label>
                       <input  onChange={e=>setEmail(e.target.value)} id="email" className="form-control" type={"email"}></input>
                       <input onClick={e=>{e.preventDefault(); sendapi()}} className="btn btn-primary" type={"submit"}></input> 
                    </fieldset>
                </form>

            </div>

        </div>


    )

}