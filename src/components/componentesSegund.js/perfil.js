import "../css/perfil.css"
import { useState, useContext, useEffect} from "react"
import userContext from "../../context/userContext";
import axios from "axios";



export const Perfil=()=>{

    const {token}=useContext(userContext);
    const name=localStorage.getItem("user")
    const [foto, setFoto]=useState(null);
    const [datos, setDatos]=useState(null)

   
// enviar foto cargada mediante una peticion put

const enviar= async()=>{
    const tokens= await token
    if (!foto) {
        alert("introduce una foto de perfil")
    }

    const data =new FormData();
    data.append("foto", foto[0])
    const config={
        headers: {
            "content-type": "multipart/form-data",
            Authorization: `Bearer ${tokens}`
          }
    }

   await axios.put("http://localhost:4000/foto",data, config)
   .then(res=>{
    console.log(res)
    getFoto()
    
   })
   .catch(err=>{
  //  console.log(err)
   })
}

const fotos=(e)=>{
    setFoto(e.target.files)
}
// obtener la foto de perfil mediante una peticion get 

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
    //    console.log(err)
    })
    

};

useEffect(()=>{
if (token) {
 getFoto()
}
// eslint-disable-next-line
}, [])


    return (
        <div>
            <div className="contenedorperfil">
                <div className="contperfilFoto">
                <img className="uploadPerfil" alt="perfil" src={"http://localhost:4000/"+ datos}/>
                 <label htmlFor="inputFile" className="boton-personalizado">
                    elige una imagen de perfil
                    <input onInput={fotos} type="file" id="inputFile" name="inputFile" className="input-personalizado" />
                 </label>
                 <button onClick={enviar} className="btn btn-secondary m-3 ">actualizar</button>


                </div>
                <div className="contenedorTexto">
                    <h3>nombre</h3><p>{name}</p>
                </div>

            </div>
        </div>
    )
}