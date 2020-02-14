import * as React from "react";
import {Button, Modal} from "semantic-ui-react";

interface Props {
    onSuccess: () => void
    onClose: () => void
    show: boolean
    objectToDelete: string
}

export default class DeleteModal extends React.Component<Props> {
    render() {
        return (
            <Modal open={this.props.show} dimmer={'blurring'} size={"mini"} name="ConfirmDeleteModal">
                <Modal.Header>
                    {this.props.objectToDelete} unwiderruflich löschen?
                </Modal.Header>
                <Modal.Content>
                    Löschvorgänge können nicht rückgängig gemacht werden.
                </Modal.Content>
                <Modal.Actions>
                    <Button onClick={this.props.onClose}>Abbrechen</Button>
                    <Button negative icon='trash' labelPosition={"right"} content={"Löschen"} onClick={this.props.onSuccess}/>
                </Modal.Actions>
            </Modal>
        );
    }
}