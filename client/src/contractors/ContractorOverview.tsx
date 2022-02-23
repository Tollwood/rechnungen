import Contractor from "./Contractor";
import * as React from "react";
import ContractorList from "./ContractorList";
import ContractorEdit from "./ContractorEdit";
import API from "../API";

interface ContractorOverviewState {
  contractors: Contractor[];
  selectedContractor: Contractor;
  editContractor: boolean;
  isLoading: boolean;
}

export default class ContractorOverview extends React.Component<{}, ContractorOverviewState> {
  constructor(props: {}) {
    super(props);
    this.state = { contractors: [], editContractor: false, selectedContractor: new Contractor(), isLoading: true };
  }

  componentDidMount(): void {
    this.refresh();
  }

  render() {
    return (
      <div className={"contractor-overview"}>
        {this.state.editContractor ? null : (
          <ContractorList
            contractors={this.state.contractors}
            onAddContractor={this.handleAddContractor.bind(this)}
            onSelect={(contractor: Contractor) => {
              this.handleSelectedContractor(contractor);
            }}
            isLoading={this.state.isLoading}
          />
        )}
        {!this.state.editContractor ? null : (
          <ContractorEdit
            contrator={this.state.selectedContractor}
            onCancelEdit={this.handleCancelEdit.bind(this)}
            onSave={this.handleSavedContractor.bind(this)}
          />
        )}
      </div>
    );
  }

  private handleAddContractor() {
    this.setState(Object.assign(this.state, { editContractor: true, selectedContractor: new Contractor() }));
  }

  private handleSelectedContractor(selectedContractor: Contractor) {
    this.setState(Object.assign(this.state, { editContractor: true, selectedContractor: selectedContractor }));
  }

  private handleCancelEdit() {
    this.setState(Object.assign(this.state, { editContractor: false, selectedContractor: new Contractor() }));
  }

  private handleSavedContractor() {
    this.setState(Object.assign(this.state, { editContractor: false, selectedContractor: new Contractor() }));
    this.refresh();
  }

  private refresh() {
    this.setState({ isLoading: true });
    API.get("/api/contractors")
      .then((res) => {
        return res.data;
      })
      .then((data) => this.setState({ contractors: data.data }))
      .finally(() => this.setState({ isLoading: false }));
  }
}
