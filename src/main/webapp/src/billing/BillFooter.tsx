import React, {Component} from 'react';
import {StyleSheet, Text, View} from '@react-pdf/renderer';

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


export default class BillFooter extends Component<{}, {}> {

    render(): React.ReactNode {
        return (
            <View style={[styles.row, styles.footer]}>
                <View style={[styles.column3, {marginLeft:10}]}>
                    <Text>Rainer Timm</Text>
                    <Text>Fasanenweg 30 </Text>
                    <Text>25364 Bokel</Text>
                </View>
                <View style={[styles.column3]}>
                    <Text>Tel.: 0176 / 51 51 26 81</Text>
                    <Text>Email: timm1960@gmail.com</Text>
                    <Text>Steuernummer: 13 187 00870</Text>
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
