import React, { Component } from "react";
import { Text, View } from "@react-pdf/renderer";
import Contractor from "../contractors/Contractor";

export default class BillGreetings extends Component<{ contractor?: Contractor }, {}> {
  render(): React.ReactNode {
    return (
      <View style={{ marginTop: 10 }} wrap={false}>
        <Text style={{ marginTop: 3 }}>Zahlungsziel: 14 Tage</Text>
        <Text style={{ marginTop: 20 }}>Ich bedanke mich für die gute Zusammenarbeit!</Text>
        <Text style={{ marginTop: 10 }}>Mit freundlichen Grüßen,</Text>
        <Text style={{ marginTop: 3 }}>
          {this.props.contractor ? this.props.contractor.firstName + " " + this.props.contractor.lastName : ""}
        </Text>
      </View>
    );
  }
}
