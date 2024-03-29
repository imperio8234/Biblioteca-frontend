import React, { useState, useContext } from "react";
import userContext from "../context/userContext";
import axios from "axios";
import "./css/agregar.css";
import sweet from "sweetalert2";





export const Agregar=()=>{

  const {token}=useContext(userContext);
  
  

  const [descrip,setDescrip]=useState([]);
  const [archivo,setArchivo]=useState(null);
  const [previ, setPrevi]= useState(null)
  const [UploadProgress, setUploadProgress]=useState(0);

  console.log(UploadProgress)
 



  const enviarApi = async (e) => {
    const tokens= await token;
    e.preventDefault();
  
    if (!archivo) {
      alert("no has escogido algo ");
    } else {
      console.log(archivo)
      const data = new FormData();
        data.append("file", archivo[0]);
        data.append("des", descrip)
        
      

        const confi = {
          headers: {
            "content-type": "multipart/form-data",
            Authorization: `Bearer ${tokens}`,
            
          },
          onUploadProgress:(ProgressEvent)=>{
            const progress= Math.round((ProgressEvent.loaded / ProgressEvent.total) * 100);
            setUploadProgress(progress);
          },
        };
        
  
    
     await axios.post("http://localhost:4000/login/home/tarea/upload", data, confi,)
        .then(res => {
          console.log(res)
          if (res.status=== 200) {
            document.getElementById("formu").reset();
            setArchivo(null);
            setDescrip(null);
            setPrevi(null);    
          }
              // alerta de guardado
            sweet.fire({
              position: 'center',
          icon: 'success',
          title: `tu archivo se a guardado`,
          showConfirmButton: true,
          timer: 1500
            });
        } )
        .catch(err => console.log(err));
    }

  };
  

const chanInput=(e)=>{
 const tarea= e.target.value
 setDescrip(tarea)

};

const file=(e)=>{
  const file=e.target.files
  setArchivo(file)
  //aqui se previsualiza a imagen en el navegador
const prev=file[0];
  if(prev){
    const reader= new FileReader();
    reader.readAsDataURL(prev);
    reader.onload =()=>{
      setPrevi(reader.result);
    }
  };
};


  return (
    <div className="contenedor p-3 mb-2 bg-primary-subtle text-emphasis-primary">
      <div className="formulario">
        <form id="formu">
          <fieldset>
            <legend>guarda imagenes y videos </legend>
            <label htmlFor="exampleFormControlTextarea1" className="form-label">escribe una referencia para la biblioteca</label>
            <textarea onChange={chanInput} class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
            <label className="form-label" htmlFor="imagen">agrega una imagen</label>
            <input onInput={file} class="form-control" type="file" id="imagen"></input>
            <input  onClick={enviarApi} type={"submit"} value="guardar" className="btn btn-dark sub" />
           
           
          </fieldset>
        </form>
        { UploadProgress > 0 &&
        
          <div className="contenedorProgress">
          {
            UploadProgress === 100 ? <span> archivo guardado</span>:
            <div className="progress" style={{ width: `${UploadProgress}%` }}>

          </div>
          }

        </div>

        }
      
{/* previsualizacion*/}
       {previ &&
        <div className="previsuali">
        <img alt="img" src={previ}></img>

      </div>

       }

      </div>
    </div>
  )
}