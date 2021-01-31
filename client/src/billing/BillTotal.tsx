import React, { Component } from "react";
import { StyleSheet, Text, View } from "@react-pdf/renderer";
import Bill from "./Bill";

export default class BillTotal extends Component<{ bill: Bill }, {}> {
  render(): React.ReactNode {
    return (
      <View wrap={false}>
        <View style={[styles.row]}>
          <Text style={[styles.column2, { marginLeft: 270, marginTop: 12 }]}>Nettobetrag</Text>
          <Text style={[styles.column2, styles.sum, { marginTop: 12 }]}>{this.sumBill(1) + " €"}</Text>
        </View>
        <View style={[styles.row]}>
          <Text style={[styles.column2, { marginLeft: 270, marginTop: 2 }]}>
            zzgl. {this.props.bill.order.taxRate * 100}% Mehrwertsteuer
          </Text>
          <Text style={[styles.column2, styles.sum]}>{this.sumBill(this.props.bill.order.taxRate) + " €"}</Text>
        </View>
        <View style={[styles.row]}>
          <Text style={[styles.column2, styles.bold, { marginLeft: 270, marginTop: 2 }]}>Total</Text>
          <Text style={[styles.column2, styles.sum, styles.bold]}>
            {console.log(this.props.bill.order.taxRate)}
            {this.sumBill(1 + this.props.bill.order.taxRate) + " €"}
          </Text>
        </View>
      </View>
    );
  }

  sumBill(factor: number): String {
    console.log(factor);
    return (
      this.props.bill.order.billItems!.map((billItem) => billItem.amount * billItem.price).reduce((a, b) => a + b, 0) *
      factor
    ).toLocaleString("de", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }
}

// Create styles
// @ts-ignore
// @ts-ignore
// @ts-ignore
const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
  },
  column2: {
    flex: 50,
  },
  sum: {
    textAlign: "right",
    marginRight: 5,
    marginTop: 2,
  },
  bold: {
    fontFamily: "Times-Bold",
  },
});