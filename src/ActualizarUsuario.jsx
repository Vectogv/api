import { useEffect, useState } from "react"
import { data, useParams } from "react-router-dom"

export default function ActualizarUsuarios(){
    const [datos, setDatos]= useState([])
    const [nombre, setNombre]=useState("")
    const [email, setEmail]=useState("")
    const [password, setPassword] = useState("")
    const {id}=useParams();

    useEffect(()=>{
        cargarUsuario()
    },[])
    async function cargarUsuario(){
        let res= await fetch("https://hcodyjgsqsotpouxnzsd.supabase.co/rest/v1/usuarios?id=eq."+id,{
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer sb_publishable_VPAgRZkgSsb3gCQ1_vLT4w_F7Yyjtz6",
                "apikey": "sb_publishable_VPAgRZkgSsb3gCQ1_vLT4w_F7Yyjtz6"
            },
        })
        let respuesta= await res.json()
        console.log(respuesta)
        setNombre(respuesta[0].nombre)
        setEmail(respuesta[0].email)
        setPassword(respuesta[0].password)
    }
   async function cambiar(){
        let res= await fetch("https://hcodyjgsqsotpouxnzsd.supabase.co/rest/v1/usuarios?id=eq."+id,{
            method:"PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer sb_publishable_VPAgRZkgSsb3gCQ1_vLT4w_F7Yyjtz6",
                "apikey": "sb_publishable_VPAgRZkgSsb3gCQ1_vLT4w_F7Yyjtz6"
            },
            body:JSON.stringify({
                 "nombre": nombre,
                "email": email,
                "password": password
            })
        })
    }

    return(
        <div>
            <h1>Actualizar</h1>
            <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Ingresa tu nombre" />
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Ingresa tu email" />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Ingresa contraseña" />
            <button onClick={cambiar()}>Actualizar</button>
        </div>
    )
}