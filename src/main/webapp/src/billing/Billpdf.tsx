import React, {Component} from 'react';
import {Document, Page, StyleSheet, Text, View} from '@react-pdf/renderer';
import Bill from "./Bill";
import BillFooter from "./BillFooter";
import BillTotal from "./BillTotal";
import BillGreetings from "./BillGreetings";
import BillItems from "./BillItems";

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
    row: {
        flexDirection: 'row'
    },
    rowBelow: {
        flexDirection: 'row',
        marginBottom: 10
    },
    column2: {
        flex: 50
    }
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
                            <Text
                                style={styles.column2}>Liegenschaft: {this.props.bill.realEstate ? this.props.bill.realEstate.name : ""}</Text>
                            <Text
                                style={styles.column2}>Kilometer: {this.props.bill.realEstate ? this.props.bill.realEstate.distance : ""}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text
                                style={styles.column2}>{this.props.bill.realEstate ? this.props.bill.realEstate.address.street : ""} {this.props.bill.realEstate ? this.props.bill.realEstate.address.houseNumber : ""}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text
                                style={styles.column2}>{this.props.bill.realEstate ? this.props.bill.realEstate.address.zipCode : ""} {this.props.bill.realEstate ? this.props.bill.realEstate.address.city : ""}</Text>
                        </View>

                        {this.shouldRender(this.props.bill.order.utilisationUnit) ? this.renderUu() : null}
                        {this.shouldRender(this.props.bill.order.firstAppointment) ? this.renderAppointments() : null}
                    </View>
                    <BillItems bill={this.props.bill} />
                    <BillTotal bill={this.props.bill}/>
                    <BillGreetings/>
                    <BillFooter technician={this.props.bill.technician}/>
                </Page>
            </Document>
        )
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
        return <View style={styles.row}>
            <Text style={styles.column2}>Erster Termin: {this.props.bill.order.firstAppointment}</Text>
            {this.shouldRender(this.props.bill.order.secondAppointment) ?
                <Text style={styles.column2}>Zweiter Termin: {this.props.bill.order.secondAppointment}</Text> : null}
        </View>
    }

    private renderUu() {
        return <View style={styles.rowBelow}>
            <Text style={styles.column2}>NE: {this.props.bill.order.utilisationUnit} - {this.props.bill.order.name}</Text>
            {this.shouldRender(this.props.bill.order.location) ?
                <Text style={styles.column2}>Lage: {this.props.bill.order.location}</Text> : null}
        </View>
    }
}
