import { Component } from "react";
import React from 'react';
import '../App.css';
export class HeadBanner extends React.Component{
    render(){
        return(
            <div className="header-banner-container">
                <a className="encabezado" href="#" data-aa-location="top header" data-aa-category="go to listing" data-aa-action="shop now - ubiforward sale">
                        <span>OFERTAS JUMEX, HASTA 85% DE DESCUENTO</span> 
                </a>
            </div>
        );
    }
    
}

