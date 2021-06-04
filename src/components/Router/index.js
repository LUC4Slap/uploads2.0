import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "../Login";
import Uploads from "../Uploads";
import Home from "../Home";
import CadastroUsuarios from "../CadastroUsuarios";

export default function Router() {
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
