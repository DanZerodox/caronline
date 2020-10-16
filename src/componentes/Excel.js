import React from "react";
import ReactExport from "react-export-excel";
import * as Constantes from '../componentes/Constantes';
import { Button, FormGroup, FormControl } from "react-bootstrap";

var url_general = Constantes.url_general;

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;


export class Download2 extends React.Component {
    constructor(props){
        super(props);
        this.state={
            reporte:[]
        }
    }

    render() {
        return (
            <ExcelFile filename="Productos" element={(<Button>Generar Excel</Button>)}>
                <ExcelSheet data={this.state.reporte.Articulos} name="Pedidos">
                    <ExcelColumn label="Sku" value="ArtSku"/>
                    <ExcelColumn label="Descripción" value="ArtDesTv"/>
                    <ExcelColumn label="Cantidad" value="TickDetCant"/>
                </ExcelSheet>
            </ExcelFile>
        );
    }

    componentDidMount(){
        var token = localStorage.getItem("token");
        this.GenerarReporte(token).then(item=>{
            this.setState({reporte:item},()=>console.log("articulos",this.state.reporte))
        })
    }

    GenerarReporte(token){
        var pro = [];
        const posturl = url_general + "api/Administrador/reporte/generar";
        var result = new Promise(function (resolve, reject) {
            fetch(posturl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            }).then(
                (res) => res.json()

            )
                .catch(error => console.log('Error', error))
                .then(resp => {
                    pro.push(resp);
                    resolve(resp);
                });
        });

        return result;
    }
}