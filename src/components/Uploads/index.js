import { useState, useEffect } from "react";
import Menu from "../Menu";
import { storage, db, auth } from "../../database/firebase";
import "./style.css";
export default function Uploads() {
  const [nome, setNome] = useState("");
  const [tamanhoArquivo, setTamanhoArquivo] = useState(0);
  const [file, setFile] = useState("");
  const [fiscal, setFiscal] = useState("");

  const handleforms = () => {
    let arquivo = document.getElementById("arquivo");
    arquivo.addEventListener("change", (e) => {
      e.preventDefault();
      let fileDoc = document.getElementById("arquivo").files[0];
      let name = document.getElementById("arquivo").files[0].name;
      let label = document.getElementById("labelFile");
      label.innerHTML = name;
      setNome(name);
      console.log(fileDoc.type);
      let fileReader = new FileReader();
      fileReader.onloadend = function (e) {
        if (
          fileDoc.type == "application/pdf" ||
          fileDoc.type == "image/jpeg" ||
          fileDoc.type == "image/png" ||
          fileDoc.type == "application/msword" ||
          fileDoc.type == "text/plain"
        ) {
          setTamanhoArquivo(fileDoc.size);
          setFile(fileReader.result);
        } else {
          setFile("");
        }
      };
      fileReader.readAsDataURL(fileDoc);
    });
  };

  const saveDoc = (e) => {
    e.preventDefault();
    let label = document.getElementById("labelFile");
    let form = document.getElementById("formUpload");
    let arquivo = document.getElementById("arquivo").files[0];
    if (
      fiscal == "" ||
      (fiscal == undefined && arquivo == null) ||
      arquivo == undefined
    ) {
      alert("Arquivo ou Analista estão faltando informar");
      return;
    } else {
      const uploadTask = storage.ref("uploads/" + arquivo.name).put(arquivo);
      let progresso = document.getElementById("progresso");
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          let progress = Math.floor(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          progresso.value = progress.toString();
        },
        (err) => {
          console.log(`Erro para mandar arquivo: ${err}`);
        },
        () => {
          storage
            .ref("uploads/" + nome)
            .getDownloadURL()
            .then((url) => {
              db.collection("urlsDocs")
                .add({
                  id: Math.floor(Math.random() * 1000),
                  nomeArquivo: nome,
                  url: url,
                  fiscal: fiscal,
                })
                .then((doc) => {
                  db.collection("urlsDocs").doc(doc.id).update({ id: doc.id });
                });
            });
          console.log("UPload finalizado");
          form.reset();
          label.innerHTML = "Selecionar Arquivo";
          progresso.value = "0";
          setFile("");
          setFiscal("");
          setTamanhoArquivo(0);
        }
      );
    }
  };

  const alterarOption = (e) => {
    let nomeFiscal = e.target.value;
    setFiscal(nomeFiscal);
  };

  return (
    <div className="container">
      <Menu />
      <div className="upload">
        <form id="formUpload" onSubmit={(e) => saveDoc(e)}>
          <label id="labelFile" htmlFor="arquivo" onClick={() => handleforms()}>
            Selecionar Arquivo
          </label>
          <input type="file" id="arquivo" />
          <progress id="progresso" value="0" max="100" min="0"></progress>
          <div className="selecionar-fiscal">
            <h4>Selecione o fiscal</h4>
            <select
              id="selectFiscal"
              value={fiscal}
              onChange={(e) => alterarOption(e)}
            >
              <option value="">Selecione</option>
              <option value="lilian@ctprice.com.br">Lilian</option>
              <option value="daniella@ctprice.com.br">Daniella</option>
              <option value="mayara@ctprice.com.br">Mayara</option>
              <option value="leandro@ctprice.com.br">Leandro</option>
            </select>
          </div>
          {tamanhoArquivo != 0 ? (
            <p>
              Tamanho do Arquivo: <strong>{tamanhoArquivo}</strong> - Bytes
            </p>
          ) : (
            <div />
          )}
          <input type="submit" name="acao" value="Enviar" />
        </form>
        {file != "" ? <iframe src={file}></iframe> : <div />}
      </div>
    </div>
  );
}
