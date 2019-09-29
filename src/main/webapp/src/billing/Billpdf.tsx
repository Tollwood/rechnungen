import React, {Component} from 'react';
import {Document, Page, StyleSheet, Text, View} from '@react-pdf/renderer';
import BillServiceTable from "./BillServiceTable";
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
    rowBelow: {
        flexDirection: 'row',
        marginBottom: 10
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
                        </View>
                        <View style={styles.rowBelow}>
                            <Text style={styles.column2}>Auftrag: {this.props.bill.order.orderId}</Text>
                            <Text
                                style={styles.column2}>Kürzel: {this.props.bill.technician ? this.props.bill.technician.technicianId : ""}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.column2}>Liegenschaft: {this.props.bill.realEstate ? this.props.bill.realEstate.name : ""}</Text>
                            <Text
                                style={styles.column2}>Kilometer: {this.props.bill.realEstate ? this.props.bill.realEstate.distance : ""}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text
                                style={styles.column2}>{this.props.bill.realEstate ? this.props.bill.realEstate.address.street : ""} {this.props.bill.realEstate ? this.props.bill.realEstate.address.houseNumber : ""}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.column2}>{this.props.bill.realEstate ? this.props.bill.realEstate.address.zipCode : ""} {this.props.bill.realEstate ? this.props.bill.realEstate.address.city : ""}</Text>
                        </View>

                        {this.shouldRender(this.props.bill.order.utilisationUnit) ? this.renderSomething() : null}
                        {this.shouldRender(this.props.bill.order.firstAppointment) ? this.renderAppointments() : null}
                    </View>
                    <BillServiceTable data={this.props.bill.billItems}/>
                    <View wrap={false}>
                        <View style={[styles.row]}>
                            <Text style={[styles.column2, {marginLeft: 270, marginTop: 12}]}>Nettobetrag</Text>
                            <Text
                                style={[styles.column2, styles.sum, {marginTop: 12}]}>{this.sumBill(1)}</Text>
                        </View>
                        <View style={[styles.row]}>
                            <Text style={[styles.column2, {marginLeft: 270, marginTop: 2}]}>zzgl. 19% Mehrwertsteuer</Text>
                            <Text style={[styles.column2, styles.sum]}>{this.sumBill(0.19)} </Text>
                        </View>
                        <View style={[styles.row]}>
                            <Text style={[styles.column2, {marginLeft: 270, marginTop: 2}]}>Total</Text>
                            <Text style={[styles.column2, styles.sum, {
                                textDecoration: "underline",
                                fontWeight: "ultrabold"
                            }]}>{this.sumBill(1.19)}</Text>
                        </View>
                    </View>
                    <View style={{marginTop: 10}} wrap={false}>
                        <Text style={{marginTop: 3}}>Zahlungsziel: 14 Tage</Text>
                        <Text style={{marginTop: 3}}>Ich bedanke mich für die gute Zusammenarbeit!</Text>
                        <Text style={{marginTop: 27}}>Rainer Timm</Text>
                    </View>
                </Page>
            </Document>
        )
    }

    sumBill(factor: number): String {
        return (this.props.bill.billItems.map(billItem => billItem.amount * billItem.price).reduce((a, b) => a + b, 0) * factor).toLocaleString('de', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
    }

    private shouldRender(...elements: any): boolean {
        if(elements == null) return false;

        for (var i = 0; i < elements.length; i++) {
            if (elements[i] === null || elements[i] === undefined || elements[i].length === 0) {
                return false;
            }
        }
        return true;
    }

    private renderAppointments() {
        return <View style={styles.row}>
            <Text style={styles.column2}>Erster Termin: {this.props.bill.order.firstAppointment}</Text>
            {this.shouldRender(this.props.bill.order.secondAppointment) ?
                <Text style={styles.column2}>Zweiter Termin: {this.props.bill.order.secondAppointment}</Text> : null}
        </View>
    }

    private renderSomething() {
        return <View style={styles.rowBelow}>
            <Text style={styles.column2}>NE: {this.props.bill.order.utilisationUnit} - {this.props.bill.order.name}</Text>
            {this.shouldRender(this.props.bill.order.location) ? <Text style={styles.column2}>Lage: {this.props.bill.order.location}</Text> : null}
        </View>
    }
}
