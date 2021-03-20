import React, { Component } from "react";
import { StyleSheet, Text, View } from "@react-pdf/renderer";
import Employee from "../employees/Employee";
import Company from "../employees/Company";

// Create styles
// @ts-ignore
// @ts-ignore
// @ts-ignore
const styles = StyleSheet.create({
  footer: {
    marginTop: 5,
    paddingTop: 5,
    fontFamily: "Times-Roman",
    borderTop: 1,
    fontSize: 10,

    position: "absolute",
    bottom: 28,
    left: 10,
    right: 10,
    color: "grey",
  },
  row: {
    flexDirection: "row",
  },
  column3: {
    flex: 33,
  },
  pageNumber: {
    position: "absolute",
    fontSize: 10,
    bottom: 0,
    textAlign: "right",
    right: 30,
    color: "grey",
  },
});

export default class BillFooter extends Component<{ employee: Employee; company: Company }, {}> {
  render(): React.ReactNode {
    const employee = this.props.employee;
    return (
      <View style={[styles.row, styles.footer]} fixed>
        <View style={[styles.column3, { marginLeft: 10 }]}>
          <Text>
            {employee.firstName} {employee.lastName}
          </Text>
          <Text>
            {employee.address.street} {employee.address.houseNumber}{" "}
          </Text>
          <Text>
            {employee.address.zipCode} {employee.address.city}
          </Text>
        </View>
        <View style={[styles.column3]}>
          <Text>Tel.: {employee.phone}</Text>
          <Text>Email: {employee.email}</Text>
          <Text>Steuernummer: {employee.taxIdent}</Text>
        </View>
        <View style={[styles.column3]}>
          <Text>{employee.bankDetails.bankName}</Text>
          <Text>IBAN {employee.bankDetails.iban}</Text>
          <Text>BIC {employee.bankDetails.bic}</Text>
        </View>
        <Text
          style={styles.pageNumber}
          render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`}
          fixed
        />
      </View>
    );
  }
}
