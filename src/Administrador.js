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


// import { Download2 } from './componentes/Excel';

import { ExportCSV } from './componentes/Excel';
var url_general = Constantes.url_general;


export class Administrador extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            productos: [],
            paginaporhoja: 5,
            page: 0,
            boton: false,
            productosfruta: [],
            mostrardetalle: false,
            despachado: false,
            show: false,
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

                {this.state.mostrardetalle === false ?
                    <div style={{ padding: 30 }}>
                        <h6>Pedidos</h6>
                        <label>Mostrar Articulos por Fruta</label>
                        <input style={{ marginLeft: 10 }} type="checkbox" onClick={() => this.OrdenarporFruta()}></input>
                        <TableContainer component={Paper}>
                            <Table aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>No. Pedido</TableCell>
                                        <TableCell>Colaborador</TableCell>
                                        <TableCell>No. Empleado</TableCell>
                                        <TableCell>Tipo de Entrega</TableCell>
                                        <TableCell>Cantidad</TableCell>
                                        <TableCell>Fecha Solicitud</TableCell>
                                        <TableCell></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {this.state.productos.slice(this.state.page * this.state.paginaporhoja, this.state.page * this.state.paginaporhoja + this.state.paginaporhoja).map((row) => (
                                        <TableRow key={row.TickId}>
                                            <TableCell component="th" scope="row">
                                                {row.TickId}
                                            </TableCell>
                                            <TableCell component="th" scope="row">
                                                {row.Nombre}
                                            </TableCell>
                                            <TableCell>{row.Empleado}</TableCell>
                                            <TableCell>{row.TickTipoEntregaDesc}</TableCell>
                                            <TableCell>{row.TotalArts}</TableCell>
                                            <TableCell>{row.TickFecha}</TableCell>
                                            <TableCell><Button variant="primary">Detalle</Button></TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>

                            </Table>
                        </TableContainer>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25]}
                            component="div"
                            count={this.state.productos.length}
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
                    :
                    <div style={{ padding: 30 }}>
                        <h6>Pedidos</h6>
                        <label>Mostrar Articulos por Fruta</label>
                        <input style={{ marginLeft: 10 }} type="checkbox" onClick={() => this.OrdenarporPedido()}></input>
                        <TableContainer component={Paper}>
                            <Table aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>No. Pedido</TableCell>
                                        <TableCell>Sku</TableCell>
                                        <TableCell>Descripción</TableCell>
                                        <TableCell>Presentación</TableCell>
                                        <TableCell>Cantidad</TableCell>
                                        {/* <TableCell></TableCell> */}
                                        <TableCell></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {this.state.productosfruta.slice(this.state.page * this.state.paginaporhoja, this.state.page * this.state.paginaporhoja + this.state.paginaporhoja).map((row) => (
                                        <TableRow key={row.TickId}>
                                            <TableCell component="th" scope="row">
                                                {row.TickId}
                                            </TableCell>
                                            <TableCell component="th" scope="row">
                                                {row.ArtSku}
                                            </TableCell>
                                            <TableCell>{row.ArtDesTv}</TableCell>
                                            <TableCell>{row.ArtPres}</TableCell>
                                            <TableCell>{row.TickDetCant}</TableCell>
                                            {/* <TableCell><Button variant="success" onClick={()=>this.AprobarArticulo(row.TickId, row.ArtSku)}>Aprobar</Button></TableCell> */}
                                            <TableCell>
                                                {row.TickDetVentaDesc !== "Sin despachar" ?
                                                    <Button variant="danger" onClick={() => this.MostrarModal(row.TickId, row.ArtSku, row.ArtDesTv)}>Rechazar</Button>
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
                            count={this.state.productosfruta.length}
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
                }
            </>
        );
    }

    componentDidMount() {
        this.CargaInicial();
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

    CargaInicial() {
        var token = localStorage.getItem("token");
        this.CargarPedidos(token).then(item => {
            this.setState({ productos: item }, () => {
                if (this.state.productos.length > 0) {
                    this.setState({ boton: true })
                }
            })
        });
    }

    CargarPedidos(token) {
        var pro = [];
        const posturl = url_general + "api/Administrador/tickets";
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

    OrdenarporFruta() {
        var token = localStorage.getItem("token");
        this.CargarProductosFruta(token).then(item => {
            this.setState({ productosfruta: item, mostrardetalle: true, productos: [] }, () => { console.log("Estados", this.state.productosfruta) })
        });
    }

    CargarProductosFruta(token) {
        var pro = [];
        const posturl = url_general + "api/Administrador/tickets/articulos";
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

    OrdenarporPedido() {
        this.setState({ mostrardetalle: false, productosfruta: [] })
        this.CargaInicial();
    }

    AprobarArticulo(id, sku) {
        console.log("btnAprobar", id);
        var token = localStorage.getItem("token");
        var pro = [];
        const posturl = url_general + "api/Administrador/ticket/" + id + "/articulo/" + sku + "/confirmar";
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
        this.ApiRechazo(id,sku, token).then(item=>{
            this.setState({
                show:false,
                productosfruta:[]
            },()=>{        
                this.OrdenarporFruta();
            })
        });
    }

    ApiRechazo(id, sku, token){
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