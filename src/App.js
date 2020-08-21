import React from 'react';
import {render} from 'react-dom';
import {Productos} from './componentes/Productos';
import { BrowserRouter, Route, Link } from "react-router-dom";
import { DetalleProducto } from "./DetalleProducto";
import { FormularioCompra } from './FormularioCompra';
import { FormularioRegistro } from './FormularioRegistro';
import { ContenidoCarrito } from './ContenidoCarrito';
import { Direcciones } from './Direcciones';
import { ResumenCompra } from './ResumenCompra';
import { Historico } from './Historico';
import { CarritoResponsivo } from './componentes/CarritoResponsivo';

class App extends React.Component{
  render(){
    return (
      <>          
       <BrowserRouter>
       <Route path="/detalleproducto/:id" exact={true} component={DetalleProducto}></Route>
       <Route path="/formulariocompra" exact={true} component={FormularioCompra}></Route>
       <Route path="/registrocuenta" exact={true} component={FormularioRegistro}></Route>
       <Route path="/contenidocarrito" component={ContenidoCarrito}></Route>
       <Route path="/direcciones" exact={true} component={Direcciones}></Route>
       <Route path="/resumen" exact={true} component={ResumenCompra}></Route>
       <Route path="/historico" exact={true} component={Historico}></Route>
       <Route path="/carritoresponsive" exact={true} component={CarritoResponsivo}></Route>
       <Route path="/" exact={true} component={Productos}></Route>
       </BrowserRouter>  
            
       </>
    );
  };
}
export default App;