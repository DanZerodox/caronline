import * as React from 'react';
import { Card, CardContent, Typography, Box } from '@material-ui/core';
import * as Constantes from '../componentes/Constantes';

var url_general = Constantes.url_general;


export class EdicionDireccion extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            direccion: [],
            nocasa:'',
            calles:'',
            area:'',
            cp:'',
            referencias:'',
            municipio:'',
            state:'',
            latitud:'',
            longitud:''
        }
        this.handleChangeCalles = this.handleChangeCalles.bind(this);
        this.handleChangeColonia = this.handleChangeColonia.bind(this);
        this.handleChangeCodigo = this.handleChangeCodigo.bind(this);
        this.handleChangeReferencias = this.handleChangeReferencias.bind(this);

    }
    handleChangeCalles(event) {
        this.setState({ calles: event.target.value }, () =>{
            var datos = { "Direccion": this.state.calles, "Municipio": this.state.municipio, "CP": this.state.cp, "Estado": this.state.state, "Colonia": this.state.area, "Referencia": this.state.referencias, "Longitud": this.state.longitud.toString(), "Latitud": this.state.latitud.toString() }
            console.log("mi direccion citch", datos);
            localStorage.setItem('editar_direccion', JSON.stringify(datos));
        })
    }

    handleChangeColonia(event) {
        this.setState({ area: event.target.value }, () => {
        var datos = { "Direccion": this.state.calles, "Municipio": this.state.municipio, "CP": this.state.cp, "Estado": this.state.state, "Colonia": this.state.area, "Referencia": this.state.referencias, "Longitud": this.state.longitud.toString(), "Latitud": this.state.latitud.toString() }
        console.log("mi direccion citch", datos);
        localStorage.setItem('editar_direccion', JSON.stringify(datos));
        })
    }

    handleChangeCodigo(event) {
        this.setState({ cp: event.target.value }, () => {
        var datos = { "Direccion": this.state.calles, "Municipio": this.state.municipio, "CP": this.state.cp, "Estado": this.state.state, "Colonia": this.state.area, "Referencia": this.state.referencias, "Longitud": this.state.longitud.toString(), "Latitud": this.state.latitud.toString() }
        console.log("mi direccion citch", datos);
        localStorage.setItem('editar_direccion', JSON.stringify(datos));
        })
    }

    handleChangeReferencias(event) {
        this.setState({ referencias: event.target.value }, () => {
        var datos = { "Direccion": this.state.calles, "Municipio": this.state.municipio, "CP": this.state.cp, "Estado": this.state.state, "Colonia": this.state.area, "Referencia": this.state.referencias, "Longitud": this.state.longitud.toString(), "Latitud": this.state.latitud.toString() }
        console.log("mi direccion citch", datos);
        localStorage.setItem('editar_direccion', JSON.stringify(datos));
        })
    }

    render() {
        return (
            <>
                <Card style={{padding:30}}>
                        <h5>Modifica tu dirección</h5>
                   
                        <div className="form-group">
                            <label htmlFor="">Dirección</label>
                            <input type="text" name="area" className="form-control" onChange={this.handleChangeCalles} value={this.state.calles} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="">Colonia</label>
                            <input type="text" name="area" className="form-control" onChange={this.handleChangeColonia} value={this.state.area} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="">Código Postal</label>
                            <input type="text" name="area" className="form-control" onChange={this.handleChangeCodigo} value={this.state.cp} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="">Referencias y/o entre calles</label>
                            <input type="text" name="area" className="form-control" onChange={this.handleChangeReferencias} value={this.state.referencias} />
                        </div>
                    </Card>
            </>
        );
    }

    componentDidMount() {
        var token = localStorage.getItem("token");
        if (token != null) {
            this.CargarDirecciones(token).then(item => {
                this.setState({ 
                    calles: item[0].Direccion,
                    area: item[0].Colonia,
                    cp: item[0].CP,
                    referencias: item[0].Referencia,
                    municipio: item[0].Municipio,
                    state: item[0].Estado,
                    latitud: item[0].Latitud,
                    longitud: item[0].Longitud
                })
            })
        } else {

        }
    }

    CargarDirecciones(token) {
        var pro = [];
        const posturl = url_general + "api/Usuario/direccion";
        var result = new Promise(function (resolve, reject) {
            fetch(posturl, {
                method: 'GET',
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