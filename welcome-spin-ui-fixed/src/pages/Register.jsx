import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "sonner";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:4000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message || "Credenciales inválidas");
        return;
      }

      // Guardar token y usuario
      localStorage.setItem("token", data.token);
      login(data.user);

      toast.success("Inicio de sesión exitoso 🎉");

      // Redirigir al inicio
      navigate("/");
    } catch (error) {
      toast.error("Error al conectar con el servidor");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-background">
      <form className="bg-card p-6 shadow rounded-md w-80" onSubmit={handleSubmit}>
        <h1 className="text-2xl font-bold mb-4 text-center">Iniciar Sesión</h1>

        <input
          className="border p-2 w-full mb-3 rounded"
          placeholder="Usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <input
          className="border p-2 w-full mb-3 rounded"
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button className="bg-primary text-white w-full py-2 rounded mt-2 hover:bg-primary/90">
          Entrar
        </button>

        <p className="text-center text-sm mt-4 text-muted-foreground">
          ¿No tienes cuenta?
          <Link to="/register" className="text-primary font-semibold ml-1">
            Regístrate aquí
          </Link>
        </p>
      </form>
    </div>
  );
}
