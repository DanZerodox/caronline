import React from 'react';
import { render } from 'react-dom';
import { Productos } from './componentes/Productos';
import { BrowserRouter, Route, Link, HashRouter } from "react-router-dom";
import { DetalleProducto } from "./DetalleProducto";
import { FormularioCompra } from './FormularioCompra';
import { FormularioRegistro } from './FormularioRegistro';
import { ContenidoCarrito } from './ContenidoCarrito';
import { Direcciones } from './Direcciones';
import { ResumenCompra } from './ResumenCompra';
import { Historico } from './Historico';
import { CarritoResponsivo } from './componentes/CarritoResponsivo';
import { DetallePedido } from './componentes/DetallePedido';
import { DetallesSugeridos } from './componentes/DetallesSugeridos';
import { Administrador } from './Administrador';
import firebase from './firebase';
class App extends React.Component {
  render() {
    return (
      <>
        <HashRouter>
          <Route path="/detallepedido/:id" exact={true} component={DetallePedido}></Route>
          <Route path="/detallesugeridos/:id" exact={true} component={DetallesSugeridos}></Route>
          <Route path="/detalleproducto/:id" exact={true} component={DetalleProducto}></Route>
          <Route path="/formulariocompra" component={FormularioCompra}></Route>
          <Route path="/registrocuenta" exact={true} component={FormularioRegistro}></Route>
          <Route path="/contenidocarrito" component={ContenidoCarrito}></Route>
          <Route path="/direcciones" exact={true} component={Direcciones}></Route>
          <Route path="/resumen" exact={true} component={ResumenCompra}></Route>
          <Route path="/historico" exact={true} component={Historico}></Route>
          <Route path="/carritoresponsive" exact={true} component={CarritoResponsivo}></Route>
          <Route path="/" exact={true} component={Productos}></Route>
          <Route path="/administrador" exact={true} component={Administrador}></Route>
        </HashRouter>

      </>
    );
  };

  componentDidMount(){
    const messaging = firebase.messaging()
    messaging.getToken().then(token=>{
      console.log('Token_mensajes',token);
    }).catch((err)=>{
      console.log('Error_mensaje',err);
    })
  }
}
export default App; 