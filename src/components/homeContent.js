import React, { useEffect, useState } from "react";
import axios from "axios";
import "./css/localHome.css"
import { CambioVistas } from "./componentesSegund.js/cambiodeVista";
import { Videos } from "./componentesSegund.js/videos";
import { Imagenes } from "./componentesSegund.js/imagenes";
//import useUser from "../hooks/useUser";



export const Contenido=()=>{


   // const { name }=useUser();    
   
       const [resultados, setResultados]=useState([]);
       const [objetos, setObjetos]=useState([]);
       const [imagenes, setImagenes]=useState([]);
       const [videos, setVideos]=useState([]);
       const [actualizar, setActualizar]=useState(false)
       const [cambioVistas, setCambioVistas]=useState();

       //comprobar si hay algo en la peticion
       const comprobar=()=>{
        if (resultados === 404) {
            setCambioVistas(false)
        }else{
            setObjetos(resultados)
            setCambioVistas(true)
        }
       };

       //peticiones a la api para recuperar los datos
       const datosApi=async ()=>{
        axios.get("https://lista-de-tareas-production.up.railway.app/login/home",{
            withCredentials:true,
        }).then(res=> {
            if (res) {
            setResultados(res.data.result.tareasConImagenes)
        }else{
            console.log("no hay archivos")
        }
        }).catch(err=> setResultados(err.response.status))  
    };

    //despues de que se actualice resultados se ejecuta la comprobacion 
   
        setTimeout(()=>{
            comprobar();

        },500)

    

    //cuando se comprueba se actualiza objetos y se ejecuta 
    //la filtracion si es video o imagen
    setTimeout(()=>{
        filtrarVideo()

    }, 1000)

    //en este paso se actualiza la vista si se elimina 
    //un objeto 
    useEffect(()=>{
        datosApi();
        setActualizar(false)        
    },[actualizar]);

    //se filtra los videos e imagenes
    const filtrarVideo=()=>{
        let setimag=[];
        let setvid=[]
        for (const obj of objetos) {
           if (obj.tipo.includes("video")) {
            setvid.push(obj)
           }else if (obj.tipo.includes("image")) {
            setimag.push(obj)  
           }
        };
        setImagenes(setimag);
        setVideos(setvid);
    };    

    //funcion para eliminar archivos dela api
    const eliminar= async(id, name)=>{
        const config={ withCredentials:true}
     await axios.delete(`https://lista-de-tareas-production.up.railway.app/login/home/eliminar/${id}/${name}`, config)
     .then(res=>{
        if (res.data.success) {
            setActualizar(true);        }
     })
     .catch(err=>console.log(err))
     };  

     return (
        <div className="contedeBody">
            <h2> {/*name*/}, esta es tu biblioteca</h2>
           <div className="contResultado">
            {
                        //iteracion de los videos
             cambioVistas? videos.map(e=>{
               
          return <Videos
                 key={e.id} 
                 id={e.id}
                 nombre={e.nombre}
                 descripcion={e.descripcion}
                 eliminar={eliminar}
                 ></Videos>
                 
                               })
                   :""                 
            }
            {
               cambioVistas?  imagenes.map(e=>{
                  return  <Imagenes 
                    key={e.id} 
                    id={e.id}
                    nombre={e.nombre}
                    descripcion={e.descripcion}
                    eliminar={eliminar}
                    />  
                   
                      })
                      :<CambioVistas />
            }
           </div>
        </div>
    )};



       