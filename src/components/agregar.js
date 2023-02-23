import React, { useState } from "react";
import axios from "axios";
import "./css/agregar.css";
import sweet from "sweetalert2";




export const Agregar=()=>{
  

  const [descrip,setDescrip]=useState([]);
  const [archivo,setArchivo]=useState(null);
  const [previ, setPrevi]= useState(null)
 



  const enviarApi = async (e) => {
    e.preventDefault();
  
    if (!archivo) {
      alert("no has escogido algo ");
    } else {
      console.log(archivo)
      const data = new FormData();
        data.append("file", archivo[0]);
        data.append("des", descrip)
        
      

      const confi={
        Headers:{"content-type": "multipart/form-data"},
        withCredentials: true,
      };
  
      console.log(data);
      axios.post("http://localhost:4000/login/home/tarea/upload", data, confi,)
        .then(res => {
          if (res.status== 200) {
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
            <legend>guada en la biblioteca</legend>
            <label for="exampleFormControlTextarea1" class="form-label">escribe una referencia para la biblioteca</label>
            <textarea onChange={chanInput} class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
            <label className="form-label" for="imagen">agrega una imagen</label>
            <input onInput={file} class="form-control" type="file" id="imagen"></input>
            <input  onClick={enviarApi} type={"submit"} value="guardar" className="btn btn-dark sub" />
           
           
          </fieldset>
        </form>

        <div className="previsuali">
          <img src={previ}></img>

        </div>

      </div>
    </div>
  )
}