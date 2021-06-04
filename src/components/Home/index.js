import { useState, useEffect } from "react";
import Menu from "../Menu";
import { db, auth } from "../../database/firebase";
import { IoTrashOutline } from "react-icons/io5";
import "./style.css";

export default function Home() {
  const [docs, setDocs] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function getUPs() {
      await auth.onAuthStateChanged(async (val) => {
        if (val) {
          await setUser(val);
        }
      });
    }
    getUPs();
    let time = setTimeout(() => {
      if (user != null) {
        clearTimeout(time);
        db.collection("urlsDocs")
          .where("fiscal", "==", user.email)
          .onSnapshot((snapshot) => {
            setDocs(snapshot.docs.map((val) => val.data()));
          });
      }
    }, 1000);
  }, [user, docs]);

  const excluir = (e) => {
    let btns = document.querySelectorAll(".btn-excluir");
    btns.forEach((val) => {
      val.addEventListener("click", (e) => {
        e.preventDefault();
        let id = val.getAttribute("data-id");
        db.collection("urlsDocs").doc(id).delete();
      });
    });
  };

  return (
    <div className="home">
      <Menu />
      <div className="header">
        <h2>Arquivos</h2>
      </div>
      {docs.map((val, i) => (
        <div key={i} className="arquivo">
          <span>{val.nomeArquivo}</span>
          <div className="containerIcon">
            <a href={val.url} target="_blanck" download={val}>
              Baixar
            </a>
            <a
              onClick={(e) => excluir(e)}
              data-id={val.id}
              className="btn-excluir"
            >
              Excluir
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}
