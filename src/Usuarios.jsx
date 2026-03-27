import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Usuarios() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState([]);

  const navigate = useNavigate();

  const API_URL = "https://hcodyjgsqsotpouxnzsd.supabase.co/rest/v1/usuarios";
  const API_KEY = "sb_publishable_VPAgRZkgSsb3gCQ1_vLT4w_F7Yyjtz6";

  useEffect(() => {
    cargarDatos();
  }, []);

  async function cargarDatos() {
    try {
      const res = await fetch(API_URL, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_KEY}`,
          apikey: API_KEY,
        },
      });

      if (!res.ok) throw new Error("Error al cargar datos");

      const data = await res.json();
      setUser(data);
    } catch (error) {
      console.error(error);
    }
  }

  async function guardar() {
    if (!nombre || !email || !password) {
      alert("Todos los campos son obligatorios");
      return;
    }

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_KEY}`,
          apikey: API_KEY,
        },
        body: JSON.stringify({
          nombre,
          email,
          password,
        }),
      });

      if (!res.ok) throw new Error("Error al guardar");

      // limpiar inputs
      setNombre("");
      setEmail("");
      setPassword("");

      cargarDatos();
    } catch (error) {
      console.error(error);
    }
  }

  async function eliminar(id) {
    try {
      await fetch(`${API_URL}?id=eq.${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_KEY}`,
          apikey: API_KEY,
        },
      });

      cargarDatos();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <h2>Usuarios</h2>

      <input
        type="text"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        placeholder="Nombre"
      />

      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />

      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />

      <button onClick={guardar}>Guardar</button>

      <table border="1">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Password</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {user.map((u) => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.nombre}</td>
              <td>{u.email}</td>
              <td>******</td> 
              <td>
                <button onClick={() => navigate(`/actualizar/${u.id}`)}>
                  Actualizar
                </button>

                <button onClick={() => eliminar(u.id)}>
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}