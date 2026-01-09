import { useState } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import { Link } from "react-router";
import { useNavigate } from "react-router";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  
  const navigate = useNavigate();

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      if (!email || !password) {
        setError("E-mail e senha são obrigatórios");
        return;
      }

      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        credentials: "include"
      });

      if (response.status === 400) {
        setError("Usuário e senha são obrigatórios");
        return;
      }

      if (response.status === 401) {
        setError("Usuário ou senha inválidos");
        return;
      }

      if (response.status === 404) {
        setError("Credenciais inválidas");
        return;
      }

      if (response.status === 500) {
        setError("Erro no servidor");
        return;
      }

      if (response.status === 200) {
        setError("");
        const data = await response.json();
        navigate("/");
        console.log(data);
      }
    } catch (error) {
      console.log(error);
      return;
    }
  }

  return (
    <form
      className="flex h-screen items-center justify-center bg-[#161410]"
      onSubmit={onSubmit}
    >
      <div className="flex flex-col items-center justify-center gap-2">
        <img src="./logo.png" alt="" className="mb-4" />
        <div className="mb-3 flex flex-col gap-2">
          <Input
            placeholder="E-mail"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            placeholder="Senha"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <p className="text-sm font-bold text-red-500">{error}</p>
        </div>

        <Button title="Login" />
        <Link to="/register" className="w-full">
          <Button title="Não tenho uma conta" variant="outline" />
        </Link>
      </div>
    </form>
  );
};

export default Login;
