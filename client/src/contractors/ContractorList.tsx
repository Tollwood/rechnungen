import Contractor from "./Contractor";
import * as React from "react";
import { Button, Placeholder } from "semantic-ui-react";

interface Props {
  onAddContractor: () => void;
  onSelect: (selectedContractor: Contractor) => void;
  contractors: Contractor[];
  isLoading: boolean;
}

export default class ContractorList extends React.Component<Props> {
  render() {
    return (
      <React.Fragment>
        <Button
          floated={"right"}
          primary
          icon={{ name: "user icon" }}
          label={"Auftragnehmer hinzufügen"}
          onClick={this.props.onAddContractor}
          className={"add"}
        />
        <table className="ui compact celled table selectable contractor-list">
          <thead>
            <tr>
              <th>Monteur</th>
              <th>Vorname</th>
              <th>Nachname</th>
              <th>Steuernummer</th>
              <th>Adresse</th>
            </tr>
          </thead>
          <tbody>{this.renderRows()}</tbody>
        </table>
      </React.Fragment>
    );
  }

  private renderRow(contractor: Contractor) {
    return (
      <tr
        onClick={() => {
          this.props.onSelect(contractor);
        }}
        key={contractor.technicianId}
        className={"row-" + contractor.technicianId}
      >
        <td>{contractor.technicianId}</td>
        <td>{contractor.firstName}</td>
        <td>{contractor.lastName}</td>
        <td>{contractor.taxIdent}</td>
        <td>
          <div>
            <div>
              {contractor.address.street} {contractor.address.houseNumber}
            </div>
            <div>
              {contractor.address.zipCode} {contractor.address.city}
            </div>
          </div>
        </td>
      </tr>
    );
  }

  private renderRows() {
    if (this.props.isLoading) {
      return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((numer) => this.placeHolderRow());
    }
    return this.props.contractors.map((contractor) => this.renderRow(contractor));
  }

  private placeHolderRow() {
    return (
      <tr>
        <td>
          <Placeholder>
            <Placeholder.Paragraph>
              <Placeholder.Line />
            </Placeholder.Paragraph>
          </Placeholder>
        </td>
        <td>
          <Placeholder>
            <Placeholder.Paragraph>
              <Placeholder.Line />
            </Placeholder.Paragraph>
          </Placeholder>
        </td>
        <td>
          <Placeholder>
            <Placeholder.Paragraph>
              <Placeholder.Line />
            </Placeholder.Paragraph>
          </Placeholder>
        </td>
        <td>
          <Placeholder>
            <Placeholder.Paragraph>
              <Placeholder.Line />
            </Placeholder.Paragraph>
          </Placeholder>
        </td>
        <td>
          <Placeholder>
            <Placeholder.Paragraph>
              <Placeholder.Line />
              <Placeholder.Line />
            </Placeholder.Paragraph>
          </Placeholder>
        </td>
      </tr>
    );
  }
}
