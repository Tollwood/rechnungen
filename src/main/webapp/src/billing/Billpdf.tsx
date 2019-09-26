import React, {Component} from 'react';
import {Document, Page, StyleSheet, Text, View} from '@react-pdf/renderer';
import BillServiceTable from "./BillServiceTable";
import BillFooter from "./BillFooter";
import Bill from "./Bill";

// Create styles
// @ts-ignore
// @ts-ignore
// @ts-ignore
const styles = StyleSheet.create({
    body: {
        paddingTop: 35,
        paddingBottom: 65,
        paddingHorizontal: 35,
        fontSize: 12,
        fontFamily: 'Times-Roman'
    },

    text: {
        margin: 12,
    },
    footer: {
        marginTop: 10,
        paddingTop: 5,
        fontFamily: 'Times-Roman',
        borderTop: 1,
        fontSize: 8,

        position: 'absolute',
        bottom: 30,
        left: 40,
        right: 40,
        color: 'grey'
    },
    text_right: {
        textAlign: "right"
    },
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

});


export default class Billpdf extends Component<{ bill: Bill }, {}> {

    render(): React.ReactNode {
        return (
            <Document>
                <Page size="A4" style={styles.body}>
                    <View style={styles.text}>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                            <Text>{this.props.bill.technician ? this.props.bill.technician.firstName : ""} {this.props.bill.technician ? this.props.bill.technician.lastName : ""}</Text>
                            <Text>Bokel am, {this.props.bill.billDate}</Text>
                        </View>
                        <Text>Fasanenweg 30 </Text>
                        <Text>25364 Bokel</Text>
                    </View>
                    <View style={styles.text}>
                        <Text>An</Text>
                        <Text>BRUNATA Wärmemesser Hagen GmbH & Co KG</Text>
                        <Text>Doberanerweg 10, 22143 Hamburg</Text>
                    </View>


                    <View style={styles.text}>
                        <View style={styles.row}>
                            <Text style={styles.column2}>Rechnung Nr.: {this.props.bill.billNumber}</Text>
                            <Text style={styles.column2}>Auftrag: {this.props.bill.order.orderId}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.column2}>Art d. Auftrags: TODO-KA</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.column2}>LG.
                                Nummer: {this.props.bill.realEstate ? this.props.bill.realEstate.name : ""}</Text>
                            <Text style={styles.column2}>Kilometer: TODO-45</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.column2}>Nutzeinheit: {this.props.bill.order.utilisationUnit}</Text>
                            <Text
                                style={styles.column2}>Kürzel: {this.props.bill.technician ? this.props.bill.technician.technicianId : ""}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.column2}>Name NE: {this.props.bill.order.name}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.column2}>Straße /
                                Ort: {this.props.bill.realEstate ? this.props.bill.realEstate.address.street : ""} {this.props.bill.realEstate ? this.props.bill.realEstate.address.houseNumber : ""}, {this.props.bill.realEstate ? this.props.bill.realEstate.address.zipCode : ""} {this.props.bill.realEstate ? this.props.bill.realEstate.address.city : ""}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.column2}>Erster Termin: {this.props.bill.order.firstAppointment}</Text>
                            <Text style={styles.column2}>Zweiter Termin: {this.props.bill.order.secondAppointment}</Text>
                        </View>
                    </View>
                    <BillServiceTable data={this.props.bill.billItems}/>
                    <View style={[styles.row]}>
                        <Text style={[styles.column2, {marginLeft: 270, marginTop: 12}]}>Nettobetrag</Text>
                        <Text
                            style={[styles.column2, styles.sum, {marginTop: 12}]}>{this.sumBill(1)}</Text>
                    </View>
                    <View style={[styles.row]}>
                        <Text style={[styles.column2, {marginLeft: 270, marginTop: 2}]}>zzgl. 19% Mehrwertsteuer</Text>
                        <Text
                            style={[styles.column2, styles.sum]}>{this.sumBill(0.19)} </Text>
                    </View>
                    <View style={[styles.row]}>
                        <Text style={[styles.column2, {marginLeft: 270, marginTop: 2}]}>Total</Text>
                        <Text style={[styles.column2, styles.sum, {
                            textDecoration: "underline",
                            fontWeight: "ultrabold"
                        }]}>{this.sumBill(1.19)}</Text>
                    </View>
                    <View style={{marginTop: 10}}>
                        <Text style={{marginTop: 3}}>Zahlungsziel: 14 Tage</Text>
                        <Text style={{marginTop: 3}}>Ich bedanke mich für die gute Zusammenarbeit!</Text>
                        <Text style={{marginTop: 27}}>Rainer Timm</Text>
                    </View>
                    <BillFooter/>
                </Page>
            </Document>
        )
    }

    sumBill(factor: number): String {
        return (this.props.bill.billItems.map(billItem => billItem.amount * billItem.price).reduce((a, b) => a + b,0) * factor).toLocaleString('de', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
    }
}
