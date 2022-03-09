import * as React from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
interface Props {
  onSuccess: () => void;
  onClose: () => void;
  show: boolean;
  name: string;
}

export default class UnsavedChangesModal extends React.Component<Props> {
  render() {
    return (
      <Dialog open={this.props.show}>
        <DialogTitle>Abbrechen</DialogTitle>
        <DialogContent>
          Ungespeicherte Änderungen gehen verloren.
          <div>Wirklich abbrechen?</div>
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={this.props.onSuccess}>
            Ja
          </Button>
          <Button onClick={this.props.onClose}>Nein</Button>
        </DialogActions>
      </Dialog>
    );
  }
}
