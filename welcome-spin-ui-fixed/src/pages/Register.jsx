import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:4000/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      toast.error(data.message);
      return;
    }

    toast.success("Usuario registrado correctamente 🎉");
  };

  return (
    <div className="flex items-center justify-center h-screen bg-background">
      <form onSubmit={handleRegister} className="p-6 bg-card shadow-lg rounded-md">
        <h1 className="text-2xl font-bold mb-4">Crear cuenta</h1>

        <Input
          placeholder="Usuario"
          className="mb-3"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <Input
          placeholder="Contraseña"
          type="password"
          className="mb-3"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button type="submit" className="w-full">
          Registrarse
        </Button>
      </form>
    </div>
  );
}
