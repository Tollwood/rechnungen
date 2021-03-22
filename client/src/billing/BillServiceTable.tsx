import ReactPDF from "@react-pdf/renderer";
import { DataTableCell, Table, TableBody, TableCell, TableHeader } from "@david.kucsai/react-pdf-table";
import React, { Component } from "react";
import BillItem from "./BillItem";

export default class BillServiceTable extends Component<{ data: any }, {}> {
  private tableStyle: ReactPDF.Style = {
    paddingLeft: 10,
    paddingTop: 5,
    paddingBottom: 5,
    paddingRight: 5,
    fontSize: 12,
  };
  private alignRightStyle: ReactPDF.Style = { textAlign: "right" };
  private centerStyle: ReactPDF.Style = { textAlign: "center" };

  render(): React.ReactNode {
    return (
      <Table data={this.props.data}>
        <TableHeader includeLeftBorder={false} includeRightBorder={false} includeTopBorder={false}>
          <TableCell
            style={[this.tableStyle, this.centerStyle]}
            weighting={0.15}
            includeRightBorder={false}
            includeLeftBorder={false}
          >
            Code
          </TableCell>
          <TableCell style={[this.tableStyle, this.centerStyle]} weighting={0.1}>
            Menge
          </TableCell>
          <TableCell style={[this.tableStyle]} weighting={0.47}>
            Leistung
          </TableCell>
          <TableCell style={[this.tableStyle, this.centerStyle]} weighting={0.14}>
            EP
          </TableCell>
          <TableCell style={[this.tableStyle, this.centerStyle]} weighting={0.14}>
            Summe
          </TableCell>
        </TableHeader>

        <TableBody includeLeftBorder={false} includeRightBorder={false} includeTopBorder={false}>
          <DataTableCell style={[this.tableStyle, this.centerStyle]} weighting={0.15} getContent={(r) => r.code} />
          <DataTableCell
            style={[this.tableStyle, this.centerStyle]}
            weighting={0.1}
            getContent={(r) => r.amount + ""}
          />
          <DataTableCell style={[this.tableStyle]} weighting={0.47} getContent={(r) => r.serviceName} />
          <DataTableCell
            style={[this.tableStyle, this.alignRightStyle]}
            weighting={0.14}
            getContent={(r) => {
              let billItem: BillItem = r;
              return (
                (billItem.price * 1).toLocaleString("de", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }) + " €"
              );
            }}
          />
          <DataTableCell
            style={[this.tableStyle, this.alignRightStyle]}
            weighting={0.14}
            getContent={(r) => {
              let billItem: BillItem = r;
              return (
                (billItem.price * billItem.amount).toLocaleString("de", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }) + " €"
              );
            }}
          />
        </TableBody>
      </Table>
    );
  }
}
