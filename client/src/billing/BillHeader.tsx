import {StyleSheet, Text, View, Image} from '@react-pdf/renderer';
import Company from "../employees/Company";
import React, {Component} from 'react';

// Create styles
// @ts-ignore
// @ts-ignore
// @ts-ignore
const styles = StyleSheet.create({
    header: {
        paddingTop: 5,
        fontFamily: 'Times-Roman',
        borderBottom: 1,
        borderBottomColor: 'grey',
        fontSize: 18,

        position: 'absolute',
        top: 5,
        left: 10,
        right: 10,
        color: 'grey'
    },
    image: {
        height:"30px",
        width:"30px"
    },
    row: {
        flexDirection: 'row'
    },

});


export default class BillHeader extends Component<{ company: Company }, {}> {

    render(): React.ReactNode {
        return (
            <View style={[styles.header, styles.row]} fixed>
                <View style={[{marginLeft: 10}, {flex:7}]}>
                    <Image src={window.location.origin + '/logo_timm.png'}  style={[styles.image]}/>
                </View>
                <View style={[{marginLeft: 5},{flex:95, minHeight:"35px"}]}>
                    <Text style={{marginTop:5}}>{this.props.company.name}</Text>
                </View>
            </View>

        )
    }
}
