import * as React from "react";
import Order from "./Order";
import {PDFViewer} from "@react-pdf/renderer";
import BillService from "../billing/BillService";
import {Button, Grid} from "semantic-ui-react";
import Billpdf from "../billing/Billpdf";
import Employee from "../employees/Employee";
import RealEstate from "../realestate/RealEstate";
import Service from "./Service";
import Helper from "../common/Helper";
import Company from "../employees/Company";

interface BillDetailsProps {
    order: Order
    technician?: Employee
    realEstate?: RealEstate
    services: Service[]
    company: Company
}

interface BillDetailsState {
    renderPdf: boolean;
}

export default class BillButton extends React.Component<BillDetailsProps, BillDetailsState> {

    constructor(props: BillDetailsProps) {
        super(props);
        this.state = {renderPdf: false}
    }

    render() {
        if (this.props.order.status !== 'ORDER_BILL_RECIEVED' && this.props.order.status !== 'ORDER_BILL' && this.props.order.status !== 'PAYMENT_RECIEVED') {
            return null;
        }
        return (
            <React.Fragment>
                <Grid.Row>
                    <Grid.Column width={16}>
                        {!this.state.renderPdf ? <Button icon={'newspaper outline'}
                                                         label={'Rechnung anzeigen'}
                                                         onClick={() => this.setState({renderPdf: true})}
                                                         disabled={this.cantShowPdf()}/> : null}

                        {this.state.renderPdf ?
                            <Button icon={'close'}
                                    label={'Rechnung ausblenden'}
                                    onClick={() => this.setState({renderPdf: false})}/> : null}

                    </Grid.Column>
                </Grid.Row>
                {this.state.renderPdf ? this.renderPdf() : null}
            </React.Fragment>
        );
    }

    private renderPdf() {
        return <Grid.Row>
            <Grid.Column width={16}>
                <PDFViewer width={"100%"} height={"800px"}>
                    <Billpdf company={this.props.company}
                             bill={BillService.createNewBill(this.props.order.billNo, this.props.order.billDate, this.props.order, this.props.services, this.props.realEstate, this.props.technician)}/>
                </PDFViewer>
            </Grid.Column>
        </Grid.Row>;
    }

    private cantShowPdf() {
        return Helper.isEmpty(this.props.order.billNo) || Helper.isEmpty(this.props.order.billDate);
    }
}