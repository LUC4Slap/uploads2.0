import React, { useEffect } from "react";
import "./style.css";
import { auth } from "../../database/firebase";
export default function Login() {
  useEffect(() => {
    auth.onAuthStateChanged((val) => {
      if (val) {
        window.location.href = "/uploads";
      }
    });
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    let email = document.getElementById("email").value;
    let senha = document.getElementById("senha").value;
    auth
      .signInWithEmailAndPassword(email, senha)
      .then((authUser) => {
        console.log(authUser);
        window.location.href = "/uploads"; // Para redirecionar
      })
      .catch((err) => {
        console.log(err);
        window.location.href = "/";
      });
  };

  const mostraSenha = () => {
    let checkbox = document.querySelector('[type="checkbox"]');
    let senha = document.getElementById("senha");
    checkbox.addEventListener("change", function ({ target }) {
      if (target.checked) {
        senha.type = "text";
      } else if (!target.checked) {
        senha.type = "password";
      }
    });
  };

  return (
    <div className="login">
      <form>
        <h2>Login</h2>
        <input id="email" type="email" placeholder="E-mail" />
        <input id="senha" type="password" placeholder="Senha" />
        <div className="exibir-senha">
          <input type="checkbox" onClick={() => mostraSenha()} />
          <span>exibir senha</span>
        </div>
        <input
          type="submit"
          name="acao"
          value="Entrar"
          onClick={(e) => handleLogin(e)}
        />
      </form>
    </div>
  );
}
