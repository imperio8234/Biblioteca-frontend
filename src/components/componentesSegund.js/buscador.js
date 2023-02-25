import axios from "axios";
import { useEffect, useState, useContext } from "react";
import userContext from "../../context/userContext";
import "../css/buscador.css"


export const Buscador = ({ inputText }) => {
  const {token}=useContext(userContext)
    const [obj, setObj] = useState([]);
  const [obBuscados, setObBuscados] = useState([]);

  // se hace la petición a la api
  useEffect(() => {
    axios.get("http://localhost:4000/login/home", {
      headers:{Authorization:`Bearer ${token} `}
    }).then(res => {
      if (res) {
        setObj(res.data.result.tareasConImagenes)
      } else {
        console.log("no hay archivos");
      }
    }).catch(err => console.log(err))
  }, [inputText,token]);

  // si hay algo en los objetos se ejecuta buscar

  useEffect(()=>{

  }, [obj])
  // c
  const comprobar=()=>{
    if (obj.length === 0) {
      console.log("cargando archivos")
    } else {
      buscarTareas()
    }

  }
  setTimeout(()=>{
    comprobar()
  }, 1000)
  // funcion buscar
  const buscarTareas = () => {
    const objBuscad = []
    for (const list of obj) {
      if (list.nombre.includes(inputText)) {
        objBuscad.push(list)
      }
    }
    setObBuscados(objBuscad)
  };

        
    return(
        <div className="buscador">
            {
                obBuscados.map(e=>{
                    return  <div className="card contBuscador" >
                    <img alt={e.nombre} className="card-img-top im" src={"http://localhost:4000/"+ e.id + e.nombre}></img>
  
                <div className="card-body">
                   <h5 className="card-title text">{e.nombre}</h5>
                    <p className="card-text">{e.descripcion}.</p>
                  </div>
  
                   </div> 
                })
            }       
        </div>
    )
};