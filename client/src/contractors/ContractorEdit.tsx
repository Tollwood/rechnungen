import Contractor from "./Contractor";
import * as React from "react";
import { ChangeEvent, useState } from "react";
import { Form, Segment } from "semantic-ui-react";
import Grid from "semantic-ui-react/dist/commonjs/collections/Grid";
import CUDButtons from "../common/CUDButtons";
import AddressInput from "../common/AddressInput";
import BankInput from "../common/BankInput";
import ErrorMapper from "../ErrorMapper";
import NameValue from "../common/NameValue";
import ContractorService from "./ContractorService";

interface Props {
  onSave: () => void;
  onCancelEdit: () => void;
  contrator: Contractor;
}

export default function ContractorEdit(props: Props) {
  const [initialContractor] = useState<Contractor>(props.contrator);
  const [contractor, setContractor] = useState<Contractor>(props.contrator);
  const [errors, setErrors] = useState(new Map<string, string>());

  function onChange(event: ChangeEvent<HTMLInputElement>) {
    setContractor({ ...contractor, [event.target.name]: event.target.value });
    setErrors(ErrorMapper.removeError(errors, event.target.name));
  }

  function handleAddressChange(nameValue: NameValue) {
    setContractor({ ...contractor, address: { ...contractor.address, [nameValue.name]: nameValue.value } });
    setErrors(ErrorMapper.removeError(errors, "address." + nameValue.name));
  }

  function handleBankDetailsChange(event: ChangeEvent<HTMLInputElement>) {
    setContractor({
      ...contractor,
      bankDetails: { ...contractor.bankDetails, [event.target.name]: event.target.value },
    });
    setErrors(ErrorMapper.removeError(errors, "address." + event.target.name));
  }

  return (
    <Segment>
      <Form>
        <Grid>
          <Grid.Row>
            <Grid.Column width={3}>
              <Form.Field>
                <label>Monteur</label>
                <Form.Input
                  id="technicianId"
                  placeholder="Monteur"
                  value={contractor.technicianId}
                  name="technicianId"
                  onChange={onChange}
                  error={errors.get("technicianId") ? { content: errors.get("technicianId") } : null}
                />
              </Form.Field>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={8}>
              <Form.Field>
                <label>Vorname</label>
                <Form.Input
                  id="firstName"
                  placeholder="Vorname"
                  value={contractor.firstName}
                  name="firstName"
                  onChange={onChange}
                  error={errors.get("firstName") ? { content: errors.get("firstName") } : null}
                />
              </Form.Field>
            </Grid.Column>
            <Grid.Column width={8}>
              <Form.Field>
                <label>Nachname</label>
                <Form.Input
                  id="lastName"
                  placeholder="Nachname"
                  value={contractor.lastName}
                  name="lastName"
                  onChange={onChange}
                  error={errors.get("lastName") ? { content: errors.get("lastName") } : null}
                />
              </Form.Field>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={8}>
              <Form.Field>
                <label>Email</label>
                <Form.Input
                  id="email"
                  placeholder="Email"
                  value={contractor.email}
                  name="email"
                  onChange={onChange}
                  error={errors.get("email") ? { content: errors.get("email") } : null}
                />
              </Form.Field>
            </Grid.Column>
            <Grid.Column width={8}>
              <Form.Field>
                <label>Telefon</label>
                <Form.Input
                  id="phone"
                  placeholder="Telefon"
                  value={contractor.phone}
                  name="phone"
                  onChange={onChange}
                  error={errors.get("phone") ? { content: errors.get("phone") } : null}
                />
              </Form.Field>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={8}>
              <Form.Field>
                <label>Steuernummer</label>
                <Form.Input
                  id="taxtIdent"
                  placeholder="Steuernummer"
                  value={contractor.taxIdent}
                  name="taxIdent"
                  onChange={onChange}
                  error={errors.get("taxIdent") ? { content: errors.get("taxIdent") } : null}
                />
              </Form.Field>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <h4>Adresse</h4>
            </Grid.Column>
          </Grid.Row>
          <AddressInput
            address={contractor.address}
            handleAddressChange={handleAddressChange}
            errors={ErrorMapper.childError(errors)}
          />
          <Grid.Row>
            <Grid.Column>
              <h4>Bankdaten</h4>
            </Grid.Column>
          </Grid.Row>
          <BankInput
            bankDetails={contractor.bankDetails}
            handleBankDetailsChange={handleBankDetailsChange}
            errors={ErrorMapper.childError(errors)}
          />

          <CUDButtons
            onSave={ContractorService.save}
            name={"Auftragnehmer"}
            object={contractor}
            initialState={initialContractor}
            onSuccess={props.onSave}
            onError={setErrors}
            onCancel={props.onCancelEdit}
            onDelete={ContractorService.delete}
            canDelete={contractor._id !== undefined}
          />
        </Grid>
      </Form>
    </Segment>
  );
}
