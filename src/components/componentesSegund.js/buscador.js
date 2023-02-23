import axios from "axios";
import { useEffect, useState } from "react";
import "../css/buscador.css"

export const Buscador=({ inputText })=>{
    const [obj, setObj]=useState([]);
    const [obBuscados, setObBuscados]=useState([]);
   
    // se hace la peticion a la api
    useEffect(()=>{
        axios.get("https://lista-de-tareas-production.up.railway.app/login/home",{
            withCredentials:true,
        }).then(res=> {
            if (res) {
            setObj(res.data.result.tareasConImagenes)
        }else{
            console.log("no hay archivos");
        }
        }).catch(err=> console.log(err))
    },[inputText]);

    //si hay algo en los objetos se ejecuta buscar
    useEffect(()=>{
        if (obj.length == 0) {
            console.log("cargando archivos")   
        }else{
            buscar()
        }
    }, [obj]);

    // funcion buscar
    const buscar=()=>{
        const objBuscad=  []
        for (const list of obj) {
            if (list.nombre.includes(inputText)) {
                objBuscad.push(list)
            }
            setObBuscados(objBuscad)   
        }};

        
    return(
        <div className="buscador">
            {
                obBuscados.map(e=>{
                    return  <div className="card contBuscador" >
                    <img  className="card-img-top im" src={"https://lista-de-tareas-production.up.railway.app/"+ e.id + e.nombre}></img>
  
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