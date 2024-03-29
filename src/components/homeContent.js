import React, {  useState, useContext, useEffect } from "react";
import userContext from "../context/userContext";
import axios from "axios";
import "./css/localHome.css"
import { CambioVistas } from "./componentesSegund.js/cambiodeVista";
import { Videos } from "./componentesSegund.js/videos";
import { Imagenes } from "./componentesSegund.js/imagenes";




export const Contenido=()=>{

    //usando contexto
   // const [nombre, setNombre]=useState("")
    const {token}=useContext(userContext);
    const name=localStorage.getItem("user")
    //setNombre(name)
    

 
     
   
       const [resultados, setResultados]=useState([]);
       const [imagenes, setImagenes]=useState([]);
       const [videos, setVideos]=useState([]);
     //  const  [actualizar, setActualizar]=useState(false)
       const [cambioVistas, setCambioVistas]=useState();


       
       useEffect(()=>{
        datosApi()
    // eslint-disable-next-line
       },[])



       
       //peticiones a la api para recuperar los datos
       const datosApi=async ()=>{
        const tokens= await token
       await axios.get("http://localhost:4000/login/home",{
             mode:"cors",
            headers:{
                Authorization:`Bearer ${tokens} `
            },
            withCredentials:true
        }).then(res=> {
            if (res) {
            setResultados(res.data.result.tareasConImagenes)
        }else{
            console.log("no hay archivos")
        }
        }).catch(err=> setResultados(err.response.status))  
    };

   
     
       //comprobar si hay algo en la peticion
       const comprobar=()=>{
        if (resultados === 404) {
            setCambioVistas(false)
        }else{
            setCambioVistas(true)
        }
       };


      

    //despues de que se actualice resultados se ejecuta la comprobacion 
   
        useEffect(()=>{
            comprobar();
            if(resultados.length > 0){
                filtrarVideo();
            }
// eslint-disable-next-line
        }, [resultados])

        
    //se filtra los videos e imagenes
    const filtrarVideo=()=>{
        let setimag=[];
        let setvid=[]
        for (const obj of resultados) {
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
     await axios.delete(`http://localhost:4000/login/home/eliminar/${id}/${name}`, config)
     .then(res=>{
        if (res.data.success) {
            //setActualizar(true); 
            datosApi();
           // setActualizar(false)      
          }
     })
     .catch(err=>console.log(err))
     };  

     return (
        <div className="contedeBody">
            <h2> {name}, esta es tu biblioteca</h2>
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



       