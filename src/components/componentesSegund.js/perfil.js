import "../css/perfil.css"
import { useState, useContext, useEffect} from "react"
import userContext from "../../context/userContext";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMessage } from '@fortawesome/free-solid-svg-icons';
import ReactModal from "react-modal";

// socket chats
import { io } from "socket.io-client";







export const Perfil=()=>{

    const socketurl =io("http://localhost:4000", { forceNew: true })

    const {token}=useContext(userContext);
    const name=localStorage.getItem("user")
    const [foto, setFoto]=useState(null);
    const [datos, setDatos]=useState(null);
    const [modal,setModal]=useState(false);

    // para enviar a el servidor del chat socket 
   //const [socket, setSocket]=useState();
    const [envChat, setEnvChat]=useState();
    const [mensage, setMensage]=useState([]);
  //  const [socketId, setSocketId]=useState();
    const [listUser, setListUser]=useState([]);
    
    

    //recibir mensagges
useEffect(()=>{
    const reciMensajes=(msg)=>{
        
        setMensage([msg, ...mensage]);
    };

    const reciveUserlist=(userlist)=>{
        setListUser(userlist)

    };
    //recibir usuarios conectados
    socketurl.on("userlist", reciveUserlist);
    //recibir mensajes
    socketurl.on("mensajedev", reciMensajes)

    return ()=> {
        socketurl.off("userlist", reciveUserlist)
        socketurl.off("mensajedev", reciMensajes) }

}, [mensage, socketurl])
    
    
   //enviar mensaje a el servidor 
    const enviarChat=(e)=>{
        e.preventDefault();
        socketurl.emit("mensage", envChat, name);
        const newMesagge={
            body:envChat,
            from:"yo"
        }  

        setMensage([newMesagge, ...mensage]);
        setEnvChat("");
    };
/// mostrar el mensaje en el cliente



////////////////////////////////////////////////////////////////////////////////

    //definir el padre del modal de react
    useEffect(()=>{
        ReactModal.setAppElement("body")

    },[])
   
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
            <div className="conteIcon" >
            <FontAwesomeIcon icon={faMessage}  className="chat" title="chat" onClick={()=>setModal(true)} />
            <div className="form-control">
                <ul>
                    {
                        listUser.map(e=>(
                            <li>{e}</li>
                        ))
                    }
                </ul>

            </div>
            
            </div>
            <ReactModal isOpen={modal} onRequestClose={()=>setModal(false)}  >

                <div >
                    <div className="contenedorChatTexto form-control p-8 overflow-y-scroll">
                        
                        {
                            mensage.map((e, index)=>( 
                                        <div key={index} className={`d-flex form-control p-2 mb-3 rounded-3  ${e.from === "yo"?"justify-content-end": "justify-content-start"} `}>
                                          <p >{e.from}:{e.body}</p>
                                        </div>
                                 
                            )) 
                        }

                    </div>
                    <form onSubmit={enviarChat}  className="form-control d-flex p-3 gap-3">
                        <input onChange={e=>setEnvChat(e.target.value)} className="form-control" type={"text"} value={envChat}></input>
                        <input className="btn btn-dark" type={"submit"}></input>

                    </form>
                </div>

            </ ReactModal>
        </div>
    )
}