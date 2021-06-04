import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { auth } from "../../database/firebase";
import Switch from "react-switch";
import { BsSun, BsMoon } from "react-icons/bs";
import "./style.css";

export default function Menu() {
  const [user, setUser] = useState(null);
  const [checked, setChecked] = useState(false);
  const [darkTheme, setDarkTheme] = useState(false);
  useEffect(() => {
    async function getUPs() {
      await auth.onAuthStateChanged(async (val) => {
        if (val) {
          await setUser(val);
        } else {
          window.location.href = "/";
        }
      });
    }
    getUPs();
  }, [user]);

  useEffect(() => {
    let theme = localStorage.getItem("theme");
    if (theme != null) {
      let themejson = JSON.parse(theme);
      setChecked(themejson.dark);
      if (themejson.dark) {
        document.documentElement.style.setProperty("--bgfundo", "#222");

        document.documentElement.style.setProperty(
          "--bgMenu",
          "rgb(41, 38, 38)"
        );
        document.documentElement.style.setProperty(
          "--btnEnviar",
          "rgb(41, 38, 38)"
        );
      } else {
        document.documentElement.style.setProperty("--bgfundo", "#fff");
        document.documentElement.style.setProperty("--bgMenu", "#1db954");
        document.documentElement.style.setProperty("--btnEnviar", "#1db954");
      }
    }
  }, [checked]);

  const logout = (e) => {
    auth.signOut();
  };

  const handleChange = (checked) => {
    setChecked(checked);
    let optoins = {
      user,
      dark: checked,
    };
    localStorage.setItem("theme", JSON.stringify(optoins));
  };

  return (
    <nav className="menu">
      <h3>CT Price</h3>
      <ul>
        <li>
          <Link to="/uploads">Uploads</Link>
        </li>
        <li>
          <Link to="/home">Home</Link>
        </li>
        <li>
          <Link to="/" onClick={() => logout()}>
            Sair
          </Link>
        </li>
        {user != null && user.email == "lucas@gmail.com" ? (
          <li>
            <Link to="/cadastro">Cadastra Usuario</Link>
          </li>
        ) : null}
      </ul>
      <div className="switch">
        <Switch
          onChange={handleChange}
          checked={checked}
          uncheckedIcon={<BsSun />}
          checkedIcon={<BsMoon />}
        />
      </div>
      <div className="usuario">
        {user != null ? (
          <span>
            {user.email}{" "}
            <img
              src={`https://picsum.photos/200/300?random=${Math.floor(
                Math.random() * 1000
              )}`}
            ></img>{" "}
          </span>
        ) : (
          <div></div>
        )}
      </div>
    </nav>
  );
}
