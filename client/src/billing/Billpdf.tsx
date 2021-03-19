import React, { Component } from "react";
import { Document, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
import Bill from "./Bill";
import BillFooter from "./BillFooter";
import BillTotal from "./BillTotal";
import BillGreetings from "./BillGreetings";
import BillItems from "./BillItems";
import Company from "../employees/Company";
import BillHeader from "./BillHeader";

// Create styles
// @ts-ignore
// @ts-ignore
// @ts-ignore
const styles = StyleSheet.create({
  body: {
    paddingTop: 40,
    paddingBottom: 65,
    paddingHorizontal: 35,
    fontSize: 12,
    fontFamily: "Times-Roman",
  },
  text: {
    margin: 12,
  },
  bold: {
    fontFamily: "Times-Bold",
  },
  row: {
    flexDirection: "row",
  },
  rowBelow: {
    flexDirection: "row",
    marginBottom: 10,
  },
  column2: {
    flex: 50,
  },
  column3: {
    flex: 33,
  },
  orderRow: {
    marginBottom: 10,
    fontSize: 14,
    fontFamily: "Times-Bold",
    flexDirection: "row",
  },
});

export default class Billpdf extends Component<{ bill: Bill; company: Company }, {}> {
  render(): React.ReactNode {
    return (
      <Document>
        <Page size="A4" style={styles.body}>
          <BillHeader company={this.props.company} />
          <View style={styles.text}>
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
              <Text>
                {this.props.bill.order.employee ? this.props.bill.order.employee.firstName : ""}{" "}
                {this.props.bill.order.employee ? this.props.bill.order.employee.lastName : ""}
              </Text>
              <Text>
                {this.props.bill.order.employee
                  ? this.props.bill.order.employee.address.city
                  : this.props.company.address.city}
                , am {this.props.bill.billDate}
              </Text>
            </View>
            <Text>
              {this.props.bill.order.employee
                ? this.props.bill.order.employee.address.street
                : this.props.company.address.street}{" "}
              {this.props.bill.order.employee
                ? this.props.bill.order.employee.address.houseNumber
                : this.props.company.address.houseNumber}
            </Text>
            <Text>
              {this.props.bill.order.employee
                ? this.props.bill.order.employee.address.zipCode
                : this.props.company.address.zipCode}{" "}
              {this.props.bill.order.employee
                ? this.props.bill.order.employee.address.city
                : this.props.company.address.city}
            </Text>
          </View>
          <View style={styles.text}>
            <Text>An</Text>
            <Text>{this.props.bill.order.clientName}</Text>
            <Text>{`${this.props.bill.order.client.street} ${this.props.bill.order.client.houseNumber}`}</Text>
            <Text>{`${this.props.bill.order.client.zipCode} ${this.props.bill.order.client.city}`}</Text>
          </View>

          <View style={styles.text}>
            <View style={styles.orderRow}>
              <Text style={[styles.column3]}>
                RG. Nr.: {this.props.bill.billNumber} {this.props.bill.order.canceled ? "STORNO" : null}
              </Text>
              <Text style={[styles.column3]}>Auftrags-ID: {this.props.bill.order.orderId}</Text>
              <Text style={[styles.column3]}>
                Monteur / AN: {this.props.bill.order.employee ? this.props.bill.order.employee.technicianId : ""}
              </Text>
            </View>
            <View style={[styles.row]}>
              <Text style={styles.column2}>
                <Text style={styles.bold}>Liegenschaft:</Text>{" "}
                {this.props.bill.order.realEstate ? this.props.bill.order.realEstate.name : ""}
              </Text>
              <Text style={styles.column2}>
                <Text style={styles.bold}>Kilometer:</Text> {this.props.bill.order.distance}
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.column2}>
                {this.props.bill.getRealEstateAddress().street} {this.props.bill.getRealEstateAddress().houseNumber}
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.column2}>
                {this.props.bill.getRealEstateAddress().zipCode} {this.props.bill.getRealEstateAddress().city}
              </Text>
            </View>

            {this.shouldRender(this.props.bill.order.utilisationUnit) ? this.renderUu() : null}
            {this.shouldRender(this.props.bill.order.firstAppointment) ? this.renderAppointments() : null}
          </View>
          <BillItems bill={this.props.bill} />
          <BillTotal bill={this.props.bill} />
          <BillGreetings technician={this.props.bill.order.employee} />
          {this.props.bill.order.employee && (
            <BillFooter technician={this.props.bill.order.employee} company={this.props.company} />
          )}
        </Page>
      </Document>
    );
  }

  private shouldRender(...elements: any): boolean {
    if (elements == null) return false;

    for (var i = 0; i < elements.length; i++) {
      if (elements[i] === null || elements[i] === undefined || elements[i].length === 0) {
        return false;
      }
    }
    return true;
  }

  private renderAppointments() {
    return (
      <View style={styles.row}>
        <Text style={styles.column2}>
          <Text style={styles.bold}>Erster Termin:</Text> {this.props.bill.order.firstAppointment}
        </Text>
        {this.shouldRender(this.props.bill.order.secondAppointment) ? (
          <Text style={styles.column2}>
            <Text style={styles.bold}>Zweiter Termin:</Text> {this.props.bill.order.secondAppointment}
          </Text>
        ) : null}
      </View>
    );
  }

  private renderUu() {
    return (
      <View style={styles.rowBelow}>
        <Text style={styles.column2}>
          <Text style={styles.bold}>NE:</Text> {this.props.bill.order.utilisationUnit}
          {this.props.bill.order.name ? " - " + this.props.bill.order.name : ""}
        </Text>
        {this.shouldRender(this.props.bill.order.location) ? (
          <Text style={styles.column2}>
            <Text style={styles.bold}>Lage:</Text> {this.props.bill.order.location}
          </Text>
        ) : null}
      </View>
    );
  }
}
