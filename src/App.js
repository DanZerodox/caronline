import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Link } from "react-router-dom";
import { Productos } from './componentes/Productos';

class App extends React.Component{
  render(){
    return(
      <BrowserRouter>
      <Productos></Productos>
      </BrowserRouter>  
     )
  }

}
export default App;
