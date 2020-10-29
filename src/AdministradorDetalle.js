import * as React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import * as Constantes from './componentes/Constantes';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { BrowserRouter, Route, Link, Redirect } from "react-router-dom";

// import { Download2 } from './componentes/Excel';

import { ExportCSV } from './componentes/Excel';
var url_general = Constantes.url_general;


export class AdministradorDetalle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            productos_deta: [],
            paginaporhoja: 5,
            page: 0,
            boton: false,
            ticketid: props.match.params.id,
            sku: "",
            descripcion: "",
            id: 0
        }
        this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this);
        this.handleChangePage = this.handleChangePage.bind(this);

    }

    handleChangeRowsPerPage = (event) => {
        this.setState({ paginaporhoja: event.target.value })
    }

    handleChangePage = (event) => {
        var pagina = this.state.page + 1;
        console.log(pagina);
        this.setState({ page: pagina })
    }

    handleBackPage = (event) => {
        var pagina = this.state.page - 1;
        console.log(pagina);
        this.setState({ page: pagina })
    }

    render() {
        return (
            <Route>
                <>
                    <Modal show={this.state.show} onHide={() => this.CerrarModal()}>
                        <Modal.Header closeButton>
                            <h5>Rechazo del Articulo {this.state.descripcion}</h5>
                        </Modal.Header>
                        <Modal.Body>
                            <label>¿Seguro que desea rechazar el articulo con sku: {this.state.sku}</label>
                            <Button variant="danger" style={{ width: '100%' }} onClick={() => this.RechazarArticulo(this.state.id, this.state.sku)} >Rechazar</Button>
                        </Modal.Body>
                    </Modal>
                    <div style={{ padding: 30 }}>
                    <h6><Link to={'/administrador'}>Pedidos </Link>/ Detalle Pedidos</h6>
                        <TableContainer component={Paper}>
                            <Table aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>SKU</TableCell>
                                        <TableCell>Presentación</TableCell>
                                        <TableCell>Cantidad</TableCell>
                                        <TableCell></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {this.state.productos_deta.slice(this.state.page * this.state.paginaporhoja, this.state.page * this.state.paginaporhoja + this.state.paginaporhoja).map((row) => (
                                        <TableRow key={row.ArtSku}>
                                            <TableCell component="th" scope="row">
                                                {row.ArtSku}
                                            </TableCell>
                                            <TableCell component="th" scope="row">
                                                {row.ArtDesTv}
                                            </TableCell>
                                            <TableCell component="th" scope="row">
                                                {row.TickDetCant}
                                            </TableCell>
                                            <TableCell>
                                            {row.TickDetVentaDesc !== "Sin despachar" ?
                                                <Button variant="danger" onClick={() => this.MostrarModal(this.state.ticketid, row.ArtSku, row.ArtDesTv)}>Rechazar</Button>
                                                :
                                                <label style={{ color: 'red' }}>Rechazado</label>
                                            }
                                            </TableCell>
                                        </TableRow>


                                    ))}
                                </TableBody>

                            </Table>
                        </TableContainer>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25]}
                            component="div"
                            count={this.state.productos_deta.length}
                            rowsPerPage={this.state.paginaporhoja}
                            page={this.state.page}
                            onChangeRowsPerPage={this.handleChangeRowsPerPage}
                            nextIconButtonProps={{ 'arial-label': 'Siguiente', 'onClick': this.handleChangePage }}
                            backIconButtonProps={{ 'arial-label': 'Anterior', 'onClick': this.handleBackPage }}
                        >

                        </TablePagination>
                        {this.state.boton === true ?
                            <ExportCSV csvData={this.state.productos} fileName={"prueba"} />
                            : null
                        }
                    </div>
                </>
            </Route>
        );
    }

    componentDidMount() {
        var token = localStorage.getItem("token");
        this.CargarPedidos(token).then(item => {
            console.log("item", item.Articulos);
            this.setState({ productos_deta: item.Articulos }, () => {
                console.log("detalle_productos", this.state.productos_deta);
            })
        });
    }

    MostrarModal(id, sku, desc) {
        this.setState({
            id: id,
            sku: sku,
            descripcion: desc,
            show: true
        })
    }

    CerrarModal() {
        this.setState({ show: false })
    }

    CargarPedidos(token) {
        var pro = [];
        const posturl = url_general + "api/Carrito/consultar/" + this.state.ticketid;
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

    RechazarArticulo(id, sku) {
        console.log("btnRechazar", id);
        var token = localStorage.getItem("token");
        this.ApiRechazo(id, sku, token).then(item => {
            this.setState({
                show: false,
                productos_deta: []
            }, () => {
                // this.CargarPedidos(token);
                window.location.reload();
            })
        });
    }

    ApiRechazo(id, sku, token) {
        var pro = [];
        const posturl = url_general + "api/Administrador/ticket/" + id + "/articulo/" + sku + "/rechazar";
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