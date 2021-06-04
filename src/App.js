import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./App.css";
import { auth } from "./database/firebase";
import Login from "./components/Login";
import Uploads from "./components/Uploads";
import Home from "./components/Home";
import CadastroUsuarios from "./components/CadastroUsuarios";
function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/uploads" component={Uploads} />
        <Route path="/home" component={Home} />
        <Route path="/cadastro" component={CadastroUsuarios} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
