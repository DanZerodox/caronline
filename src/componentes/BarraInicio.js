import * as React from 'react';
import Card from 'react-bootstrap/Card';
import { BrowserRouter,Route, Link } from "react-router-dom";
export class BarraInicio extends React.Component{
    render(){
        return(
            <BrowserRouter>
             <Card>
                <Card.Body style={{padding:'0.5rem', height:42, boxShadow:'0 0 8px rgba(0,0,0,.12)'}}>
                    <ul>
                        <li className="flecha">
                            <Link to={'/'}> 
                                <a style={{color:'#929db6', fontSize:12}} href="#" class="breadcrumb-home-element" data-cat-name="home">Inicio</a>
                            </Link>   
                        </li>
                        <li>
                            <span className="svg-wrapper">
                                <svg className="icono" style={{width:20}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500"><path d="M252.684 2.67l-35.33 35.331 186.999 187H0v49.97h404.353l-187 187.098 35.331 35.331 211.985-212.083L500 249.987l-35.33-35.331z" fill="#008aa4"></path></svg>
                                </span>
                            <span className="segundo">Últimos Productos</span>
                        </li>
                    </ul>
                </Card.Body>
             </Card>
            </BrowserRouter>
        );
    }
}
