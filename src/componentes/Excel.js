import * as React from 'react';
import Button from 'react-bootstrap/Button';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import * as Constantes from '../componentes/Constantes';

var url_general = Constantes.url_general;

export const ExportCSV = ({csvData, fileName}) => {

    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';

    const exportToCSV = (csvData, fileName) => {
        console.log("CVDATA",csvData);
        const array=[];
        var i =0;
        for (let index = 0; index < csvData.length; index++) {
            csvData[index].Articulos.map(item=>(
                array.push({"No. Pedido":csvData[index].TickId,"Tipo de Entrega":csvData[index].TickTipoEntregaDesc,"Sku":item.ArtSku, "Descripción":item.ArtDesTv, "Presentación":item.ArtPres, "Cantidad":item.TickDetCant})
            ))
            index = index +1;
            
        }
        console.log("maira",array)
        const  ws= XLSX.utils.json_to_sheet(array);
        // if (csvData.Articulos === null) {
        //    ws= XLSX.utils.json_to_sheet(csvData);
        // }
        const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const data = new Blob([excelBuffer], {type: fileType});
        FileSaver.saveAs(data, fileName + fileExtension);

        window.location.reload();
    }

    const ExportarExcel=()=> {
        var token = localStorage.getItem("token");
        GenerarReporte(token).then(item => {
            console.log("item",item.Reporte[0]);
            exportToCSV(item.Reporte,"Pedidos");
        })
    }

    const GenerarReporte=(token)=> {
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

    return (
        <Button variant="success" onClick={() => ExportarExcel()}>Exportar Excel</Button>
    )

   
}

