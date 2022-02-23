import React, { Component } from "react";
import { StyleSheet, Text, View } from "@react-pdf/renderer";
import Contractor from "../contractors/Contractor";
import Company from "../contractors/Company";

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

export default class BillFooter extends Component<{ contractor: Contractor; company: Company }, {}> {
  render(): React.ReactNode {
    const contractor = this.props.contractor;
    return (
      <View style={[styles.row, styles.footer]} fixed>
        <View style={[styles.column3, { marginLeft: 10 }]}>
          <Text>
            {contractor.firstName} {contractor.lastName}
          </Text>
          <Text>
            {contractor.address.street} {contractor.address.houseNumber}{" "}
          </Text>
          <Text>
            {contractor.address.zipCode} {contractor.address.city}
          </Text>
        </View>
        <View style={[styles.column3]}>
          <Text>Tel.: {contractor.phone}</Text>
          <Text>Email: {contractor.email}</Text>
          <Text>Steuernummer: {contractor.taxIdent}</Text>
        </View>
        <View style={[styles.column3]}>
          <Text>{contractor.bankDetails.bankName}</Text>
          <Text>IBAN {contractor.bankDetails.iban}</Text>
          <Text>BIC {contractor.bankDetails.bic}</Text>
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
