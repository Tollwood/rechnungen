import React, {Component} from 'react';
import {StyleSheet, Text, View} from '@react-pdf/renderer';
import Bill from "./Bill";


export default class BillTotal extends Component<{bill: Bill}, {}> {

    render(): React.ReactNode {
        return (
            <View wrap={false}>
                <View style={[styles.row]}>
                    <Text style={[styles.column2, {marginLeft: 270, marginTop: 12}]}>Nettobetrag</Text>
                    <Text
                        style={[styles.column2, styles.sum, {marginTop: 12}]}>{this.sumBill(1)+" €"}</Text>
                </View>
                <View style={[styles.row]}>
                    <Text style={[styles.column2, {marginLeft: 270, marginTop: 2}]}>zzgl. 19% Mehrwertsteuer</Text>
                    <Text style={[styles.column2, styles.sum]}>{this.sumBill(0.19)+" €"}</Text>
                </View>
                <View style={[styles.row]}>
                    <Text style={[styles.column2, styles.bold, {marginLeft: 270, marginTop: 2}]}>Total</Text>
                    <Text style={[styles.column2, styles.sum, styles.bold]}>{this.sumBill(1.19)+" €"}</Text>
                </View>
            </View>

        )
    }

    sumBill(factor: number): String {
        return (this.props.bill.order.billItems.map(billItem => billItem.amount * billItem.price).reduce((a, b) => a + b, 0) * factor).toLocaleString('de', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
    }
}

// Create styles
// @ts-ignore
// @ts-ignore
// @ts-ignore
const styles = StyleSheet.create({
    row: {
        flexDirection: 'row'
    },
    column2: {
        flex: 50
    },
    sum: {
        textAlign: "right",
        marginRight: 5,
        marginTop: 2
    },
    bold: {
        fontFamily: 'Times-Bold'
    }
});