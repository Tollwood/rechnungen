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

interface BillDetailsProps {
    order: Order
    technician?: Employee
    realEstate?: RealEstate
    services: Service[]
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
        return (
            <React.Fragment>
                <Grid.Row>
                    {!this.state.renderPdf? <Button icon={'newspaper outline'}
                                                    label={'Rechnung anzeigen'}
                                                    onClick={()=>this.setState({renderPdf:true})}
                                                    disabled={this.cantShowPdf()}/>: null}

                    {this.state.renderPdf?
                            <Button icon={'close'}
                                    label={'Rechnung ausblenden'}
                                    onClick={()=>this.setState({renderPdf:false})} /> : null}

                </Grid.Row>
                {this.state.renderPdf ? this.renderPdf(): null}
            </React.Fragment>
        );
    }

    private renderPdf() {
        return <Grid.Row>
            <Grid.Column width={16}>
                <PDFViewer width={"100%"} height={"800px"}>
                    <Billpdf
                        bill={BillService.createNewBill(this.props.order.billNo, this.props.order.billDate, this.props.order, this.props.services, this.props.realEstate, this.props.technician)}/>
                </PDFViewer>
            </Grid.Column>
        </Grid.Row>;
    }

    private cantShowPdf() {
        return Helper.isEmpty(this.props.order.billNo)|| Helper.isEmpty(this.props.order.billDate);
    }
}