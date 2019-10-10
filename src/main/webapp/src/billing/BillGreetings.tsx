import React, {Component} from 'react';
import {Text, View} from '@react-pdf/renderer';

export default class BillGreetings extends Component<{}, {}> {

    render(): React.ReactNode {
        return (
            <View style={{marginTop: 10}} wrap={false}>
                <Text style={{marginTop: 3}}>Zahlungsziel: 14 Tage</Text>
                <Text style={{marginTop: 3}}>Ich bedanke mich für die gute Zusammenarbeit!</Text>
                <Text style={{marginTop: 27}}>Rainer Timm</Text>
            </View>
        )
    }
}
