import * as React from "react";
import {Button, Modal} from "semantic-ui-react";

interface Props {
    onSuccess: () => void
    onClose: () => void
    show: boolean
    name: string
}

export default class UnsavedChangesModal extends React.Component<Props> {
    render() {
        return (
            <Modal open={this.props.show} dimmer={'blurring'} size={"mini"} name="UnsavedChangesModal">
                <Modal.Header>
                    Abbrechen
                </Modal.Header>
                <Modal.Content>
                    Ungespeicherte Änderungen gehen verloren.
                    <div>Wirklich abbrechen?</div>
                </Modal.Content>
                <Modal.Actions>
                    <Button primary content={"Ja"} onClick={this.props.onSuccess} />
                    <Button  content={"Nein"} onClick={this.props.onClose}/>
                </Modal.Actions>
            </Modal>
        );
    }
}