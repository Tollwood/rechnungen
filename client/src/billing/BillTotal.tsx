import React from "react";
import { StyleSheet, Text, View } from "@react-pdf/renderer";
import Bill from "./Bill";
import BillItem from "./BillItem";
interface Props {
  bill: Bill;
}

const BillTotal: React.FC<Props> = ({ bill }: Props) => {
  const wihthoutTax = sumBill(bill.order.billItems || [], 1);
  const tax = sumBill(bill.order.billItems || [], bill.order.taxRate);

  return (
    <View wrap={false}>
      <View style={[styles.row]}>
        <Text style={[styles.column2, { marginLeft: 270, marginTop: 12 }]}>Nettobetrag</Text>
        <Text style={[styles.column2, styles.sum, { marginTop: 12 }]}>{toEuroString(wihthoutTax)}</Text>
      </View>
      <View style={[styles.row]}>
        <Text style={[styles.column2, { marginLeft: 270, marginTop: 2 }]}>
          zzgl. {bill.order.taxRate * 100}% Mehrwertsteuer
        </Text>
        <Text style={[styles.column2, styles.sum]}>{toEuroString(tax)}</Text>
      </View>
      <View style={[styles.row]}>
        <Text style={[styles.column2, styles.bold, { marginLeft: 270, marginTop: 2 }]}>Total</Text>
        <Text style={[styles.column2, styles.sum, styles.bold]}>{toEuroString(wihthoutTax + tax)}</Text>
      </View>
    </View>
  );
};

const sumBill = (billItems: BillItem[], factor: number): number => {
  return billItems!.map((billItem) => billItem.amount * billItem.price).reduce((a, b) => a + b, 0) * factor;
};

const toEuroString = (number: number) => {
  return `${number.toLocaleString("de", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })} €`;
};

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

export default BillTotal;
