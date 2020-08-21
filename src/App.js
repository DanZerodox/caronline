import React from 'react';
import logo from './logo.svg';
import { BrowserRouter, Route, Link } from "react-router-dom";
import { Productos } from './componentes/Productos';
import { DetalleProducto } from "./DetalleProducto";

class App extends React.Component{
  render(){
    return(
      <BrowserRouter>
        <Route path="/detalleproducto/:id" exact={true} component={DetalleProducto}></Route>
        <Route path="/" exact={true} component={Productos}></Route>
      </BrowserRouter>  
     )
  }

}
export default App;
