import { useState } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import { Link } from "react-router";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [cep, setCep] = useState("");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      if (!name || !email || !password || !cep) {
        setError("Todos os campos são obrigatórios");
        return;
      }

      if (password !== confirmPassword) {
        setError("Senhas não conferem");
        return;
      }

      const response = await fetch("http://localhost:3000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password, cep }),
      });

      switch (response.status) {
        case 400:
          setError("Todos os campos são obrigatórios");
          break;

        case 409:
          setError("E-mail já cadastrado");
          break;

        case 201:
          setError("");
          setName("");
          setEmail("");
          setPassword("");
          setConfirmPassword("");
          setCep("");
          break;

        case 500:
          setError("Erro interno. Tente novamente mais tarde.");
          break;

        default:
          setError("");
      }

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log("Erro ao cadastrar usuário", error);
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
        <Input
          placeholder="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          placeholder="Email"
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
        <Input
          placeholder="Confirme sua senha"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <Input
          placeholder="CEP"
          type="text"
          value={cep}
          onChange={(e) => setCep(e.target.value)}
        />

        <p className="text-sm font-bold text-red-500">{error}</p>

        <div className="mt-2 flex w-full flex-col gap-2">
          <Button title="Criar conta" type="submit" />
          <Link to="/login" className="w-full">
            <Button title="Já tenho uma conta" variant="outline" />
          </Link>
        </div>
      </div>
    </form>
  );
};

export default Register;
