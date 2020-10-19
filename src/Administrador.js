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
            boton: false
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
            <div style={{ padding: 30 }}>
                <h6>Pedidos</h6>
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
                    :null
                }
            </div>
        );
    }

    componentDidMount() {
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


}