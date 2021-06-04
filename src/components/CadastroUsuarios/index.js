import react from "react";
import "./style.css";
import { auth } from "../../database/firebase";
import Menu from "../Menu";
export default function CadastroUsuarios() {
  const cadastrarUsuario = (e) => {
    e.preventDefault();
    let form = document.querySelector("#form");
    let email = document.querySelector("#email").value;
    let senha = document.querySelector("#senha").value;
    auth.createUserWithEmailAndPassword(email, senha).then((authUser) => {
      alert("Usuario criado");
      form.reset();
    });
    console.log(email, senha);
  };

  return (
    <div className="cadastro">
      <Menu />
      <div className="form-cadastro">
        <form id="form" onSubmit={(e) => cadastrarUsuario(e)}>
          <h2>Cadastro</h2>
          <input id="email" type="email" placeholder="E-mail..." />
          <input id="senha" type="password" placeholder="Senha..." />
          <input type="submit" name="acao" value="Cadastrar" />
        </form>
      </div>
    </div>
  );
}
