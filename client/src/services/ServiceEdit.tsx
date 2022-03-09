import * as React from "react";
import { useState } from "react";
import CUDButtons from "../common/CUDButtons";
import Service from "../order/Service";
import ServiceService from "./ServiceService";
import ErrorMapper from "../ErrorMapper";
import { ChangeEvent } from "react";
import { Grid, TextField, Paper } from "@mui/material";

interface Props {
  onSave: () => void;
  onCancelEdit: () => void;
  onDelete: () => void;
  service: Service;
}

export default function ServiceEdit(props: Props) {
  const [service, setService] = useState<Service>(props.service);
  const [initialService] = useState<Service>(props.service);
  const [errors, setErrors] = useState(new Map<string, string>());

  function handleSelectable(event: React.FormEvent<HTMLInputElement>, data: any) {
    setService({ ...service, selectable: data.checked });
    setErrors(ErrorMapper.removeError(errors, "selectable"));
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setService({ ...service, [event.target.name]: event.target.value });
    setErrors(ErrorMapper.removeError(errors, event.target.name));
  }

  return (
    <Paper>
      <Grid>
        <Grid container>
          <Grid xs={12}>
            <TextField
              id="articleNumber"
              label="Code"
              placeholder="Code"
              value={service.articleNumber}
              name="articleNumber"
              onChange={handleChange}
              //    error={errors.get("articleNumber") ? { content: errors.get("articleNumber") } : null}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="title"
              label="Bezeichnung"
              placeholder="Bezeichnung"
              value={service.title}
              name="title"
              onChange={handleChange}
              //    error={errors.get("title") ? { content: errors.get("title") } : null}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Preis"
              type={"number"}
              //step="0.01"
              id="price"
              placeholder="Preis"
              value={service.price}
              name="price"
              onChange={handleChange}
              //icon={<Icon name="eur" />}
              // error={errors.get("price") ? { content: errors.get("price") } : null}
            />
          </Grid>

          <Grid item xs={12}>
            {/* <Form.Field>
                <Checkbox
                  toggle
                  name="selectable"
                  id="selectable"
                  label="Wählbar"
                  checked={service.selectable}
                  onChange={handleSelectable}
                />
              </Form.Field> */}
          </Grid>
        </Grid>
        <CUDButtons
          onSave={ServiceService.save}
          onDelete={ServiceService.delete}
          name={"Dienstleistung"}
          object={service}
          initialState={initialService}
          onSuccess={props.onSave}
          onCancel={props.onCancelEdit}
          onError={setErrors}
          canDelete={service.id !== undefined}
        />
      </Grid>
    </Paper>
  );
}
