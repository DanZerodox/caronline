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
import { Download2 } from './componentes/Excel';

var url_general = Constantes.url_general;


export class Administrador extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            productos: [],
            paginaporhoja: 5,
            page: 0
        }
        this.handleChangePage = this.handleChangePage(this);
        this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this);
       
    } 
    handleChangePage = (event) =>{
    }
    handleChangeRowsPerPage = (event) =>{
         this.setState({paginaporhoja:event.target.value})        
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
                                <TableCell align="right">No. Empleado</TableCell>
                                <TableCell align="right">Cantidad</TableCell>
                                <TableCell align="right">Fecha Solicitud</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.productos.slice(1, this.state.paginaporhoja).map((row) => (
                                <TableRow key={row.TickId}>
                                    <TableCell component="th" scope="row">
                                        {row.TickId}
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        {row.Nombre}
                                    </TableCell>
                                    <TableCell align="right">{row.Empleado}</TableCell>
                                    <TableCell align="right">{row.TotalArts}</TableCell>
                                    <TableCell align="right">{row.TickFecha}</TableCell>
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
                    onChangePage={this.handleChangePage}
                    onChangeRowsPerPage={this.handleChangeRowsPerPage}
                >

                </TablePagination>
                <Download2></Download2>
            </div>
        );
    }

    componentDidMount() {
        var token = localStorage.getItem("token");
        this.CargarPedidos(token).then(item => {
            this.setState({ productos: item }, () => { console.log("Productos", this.state.productos) })
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