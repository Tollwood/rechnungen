import React, {Component} from 'react';
import {StyleSheet, Text, View} from '@react-pdf/renderer';
import Employee from "../employees/Employee";

// Create styles
// @ts-ignore
// @ts-ignore
// @ts-ignore
const styles = StyleSheet.create({
    footer: {
        marginTop: 5,
        paddingTop: 5,
        fontFamily: 'Times-Roman',
        borderTop: 1,
        fontSize: 10,

        position: 'absolute',
        bottom: 28,
        left: 10,
        right: 10,
        color: 'grey'
    },
    row: {
        flexDirection: 'row'
    },
    column3: {
        flex: 33
    },
    pageNumber: {
        position: 'absolute',
        fontSize: 10,
        bottom: 0,
        textAlign: "right",
        right: 30,
        color: 'grey',
    },
});


export default class BillFooter extends Component<{ technician?: Employee }, {}> {

    render(): React.ReactNode {
        var technician: Employee;
        if (this.props.technician === undefined)
        {
            technician = {firstName: "FirstName", lastName: "LastName", taxIdent:"1234", address: {street:"street", houseNumber:"4", zipCode:"25355", city:"Barmstedt"}, technicianId:"1",_links:{}};
        }else {
            technician = this.props.technician;
        }
        return (
            <View style={[styles.row, styles.footer]} fixed>
                <View style={[styles.column3, {marginLeft: 10}]}>
                    <Text>{technician.firstName} {technician.lastName}</Text>
                    <Text>{technician.address.street} {technician.address.houseNumber} </Text>
                    <Text>{technician.address.zipCode} {technician.address.city}</Text>
                </View>
                <View style={[styles.column3]}>
                    <Text>Tel.: 0176 / 51 51 26 81</Text>
                    <Text>Email: timm1960@gmail.com</Text>
                    <Text>Steuernummer: {technician.taxIdent}</Text>
                </View>
                <View style={[styles.column3]}>
                    <Text>Hypo-Vereinsbank HH</Text>
                    <Text>IBAN DE45 2003 0000 0016 3761 13</Text>
                    <Text>BIC HYVEDEMM300</Text>
                </View>
                <Text style={styles.pageNumber} render={({pageNumber, totalPages}) => (
                    `${pageNumber} / ${totalPages}`
                )} fixed/>
            </View>

        )
    }
}
