import { Component } from "react";
import React from 'react';
import '../App.css';

export class Banner extends React.Component{
    render(){
        return(
            <div className="category-landing-banner-wrapper">
            <div className="html-slot-container" data-tc100="null">
            <div className="category-banner_static">
                      <picture>
                        <source media="(min-width: 660px)" srcset={require("../images/Jumex/nuestrasmarcas.png")}/>
                        <source media="(min-width: 0px)" srcset={require("../images/Jumex/nuestrasmarcas.png")}/>
                        <img src={require("../images/Jumex/nuestrasmarcas.png")} alt="UBIFWD Sale Category banner"/>
                      </picture>
                    </div>
            </div>
            </div> 
        );
    }
}

