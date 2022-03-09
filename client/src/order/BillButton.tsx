import * as React from "react";
import Order from "./Order";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import BillService from "../billing/BillService";
import Billpdf from "../billing/Billpdf";
import Service from "./Service";
import Helper from "../common/Helper";
import Company from "../contractors/Company";
import { Grid, Button } from "@mui/material";

interface BillDetailsProps {
  order: Order;
  services: Service[];
  company: Company;
}

interface BillDetailsState {
  renderPdf: boolean;
}

export default class BillButton extends React.Component<BillDetailsProps, BillDetailsState> {
  constructor(props: BillDetailsProps) {
    super(props);
    this.state = { renderPdf: false };
  }

  render() {
    if (
      this.props.order.status !== "ORDER_BILL_RECIEVED" &&
      this.props.order.status !== "ORDER_BILL" &&
      this.props.order.status !== "PAYMENT_RECIEVED"
    ) {
      return null;
    }
    return (
      <React.Fragment>
        <Grid container>
          {/* <Grid item xs={16}>
            {!this.state.renderPdf ? (
              <Button
                icon={"newspaper outline"}
                label={"Rechnung anzeigen"}
                onClick={() => this.setState({ renderPdf: true })}
                disabled={this.cantShowPdf()}
              />
            ) : null}

            {this.state.renderPdf ? (
              <React.Fragment>
                <Button
                  icon={"close"}
                  label={"Rechnung ausblenden"}
                  onClick={() => this.setState({ renderPdf: false })}
                />
                <PDFDownloadLink
                  document={
                    <Billpdf
                      company={this.props.company}
                      bill={BillService.createNewBill(
                        this.props.order.billNo,
                        this.props.order.billDate,
                        this.props.order
                      )}
                    />
                  }
                  fileName={this.props.order.billNo + ".pdf"}
                >
                  {({ blob, url, loading, error }) => (loading ? "Rechnung wird generiert" : "Rechnung herunterladen")}
                </PDFDownloadLink>
              </React.Fragment>
            ) : null}
          </Grid> */}

          {this.state.renderPdf ? this.renderPdf() : null}
        </Grid>
      </React.Fragment>
    );
  }

  private renderPdf() {
    return (
      <Grid item xs={12}>
        <PDFViewer width={"100%"} height={"800px"}>
          <Billpdf
            company={this.props.company}
            bill={BillService.createNewBill(this.props.order.billNo, this.props.order.billDate, this.props.order)}
          />
        </PDFViewer>
      </Grid>
    );
  }

  private cantShowPdf() {
    return Helper.isEmpty(this.props.order.billNo) || Helper.isEmpty(this.props.order.billDate);
  }
}
