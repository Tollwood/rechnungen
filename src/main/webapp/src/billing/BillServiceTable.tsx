import ReactPDF from '@react-pdf/renderer';
import {DataTableCell, Table, TableBody, TableCell, TableHeader} from "@david.kucsai/react-pdf-table";
import React, {Component} from 'react';
import BillItem from "./BillItem";

export default class BillServiceTable extends Component<{ data: any }, {}> {
    private tableStyle: ReactPDF.Style = {paddingLeft: 10, paddingTop: 5, paddingBottom: 5, paddingRight: 5, fontSize: 12};
    private priceStyle: ReactPDF.Style = {textAlign: "right"};

    render(): React.ReactNode {
        return (
            <Table data={this.props.data}>
                <TableHeader includeLeftBorder={false} includeRightBorder={false} includeTopBorder={false}>
                    <TableCell styles={[this.tableStyle]} weighting={0.15} includeRightBorder={ false} includeLeftBorder={false}>
                        Codierung
                    </TableCell>
                    <TableCell styles={[this.tableStyle]} weighting={0.1}>
                        Menge
                    </TableCell>
                    <TableCell styles={[this.tableStyle]} weighting={0.47}>
                        Leistung
                    </TableCell>
                    <TableCell styles={[this.tableStyle, this.priceStyle]} weighting={0.14}>
                        Einzelpreis
                    </TableCell>
                    <TableCell styles={[this.tableStyle, this.priceStyle]} weighting={0.14}>

                    </TableCell>
                </TableHeader>

                <TableBody includeLeftBorder={false} includeRightBorder={false} includeTopBorder={false}>
                    <DataTableCell styles={[this.tableStyle]} weighting={0.15} getContent={(r) => r.code}/>
                    <DataTableCell styles={[this.tableStyle, this.priceStyle]} weighting={0.1} getContent={(r) => r.amount + ""}/>
                    <DataTableCell styles={ [this.tableStyle]} weighting={0.47} getContent={(r) => r.serviceName}/>
                    <DataTableCell styles={ [this.tableStyle, this.priceStyle]} weighting={0.14} getContent={(r) => r.price +""}/>
                    <DataTableCell styles={[this.tableStyle, this.priceStyle]} weighting={0.14} getContent={(r) => {
                        let billItem: BillItem = r;
                        let sum = billItem.price * billItem.amount ;
                        return sum + "";
                    } }/>
                </TableBody>
            </Table>
        )
    }
}
