import * as React from "react";
import {useState} from "react";
import {Button, Grid, Responsive} from "semantic-ui-react";
import {useAlert} from "react-alert";
import UnsavedChangesModal from "../UnsavedChangesModal";

interface Props {
    onSave: (onSuccess: () => void, onError: (errors: Map<string, string>) => void) => void
    object: any
    name: string
    onSuccess: () => void
    onCancel: () => void
    onDelete: (object: any, onSuccess: () => void, onError: (errors: Map<string, string>) => void) => void
    onError: (errors: Map<string, string>) => void
    initialState: any
    canDelete: boolean
}

export default function CUDButtons(props: Props) {

    const alert = useAlert();

    const [showCancelModal, setShowCancelModal] = useState(false);

    function confirmSuccess(onSuccess: () => void, action: string) {
        return () => {
            alert.success(props.name + " " + action, {timeout: 2000});
            onSuccess();
        }
    }

    function confirmError(onError: (errors: Map<string, string>) => void, action: string) {
        return (errors: Map<string, string>) => {
            alert.error(props.name + " konnte nicht " + action + " werden");
            onError(errors);
        }
    }

    function confirmUnchangedCancel() {
        if (props.initialState !== props.object) {
            setShowCancelModal(true);
        } else {
            props.onCancel();
        }
    }

    return <Grid.Row centered>
        <Grid.Column width={16}>
            <Responsive minWidth={481}>
                <Button.Group widths={props.canDelete ? 3 : 2}>
                    <Button primary content='Speichern' icon='save' labelPosition='left'
                                 onClick={() => props.onSave(confirmSuccess(props.onSuccess, "gepeichert"), confirmError(props.onError, "gepeichert"))}
                                 className={'save-bttn'}/>
                    <Button content='Abbrechen' icon='cancel' labelPosition='left' onClick={confirmUnchangedCancel}
                            className={'cancel-bttn'}/>
                    {props.canDelete ?
                        <Button floated={"right"} color={"red"} content={"Löschen"} icon='trash' labelPosition='left'
                                className={'delete-bttn'}
                                onClick={() => props.onDelete(props.object, confirmSuccess(props.onSuccess, "gelöscht"), confirmError(props.onError, "gelöscht"))}/> : null
                    }
                </Button.Group>
            </Responsive>
            <Responsive maxWidth={480}>
                <Button.Group widths={props.canDelete ? 2 : 1}>
                    <Button primary content='Speichern' icon='save' labelPosition='left'
                                 onClick={() => props.onSave(confirmSuccess(props.onSuccess, "gepeichert"), confirmError(props.onError, "gepeichert"))}
                                 className={'save-bttn'}/>
                    {props.canDelete ?
                        <Button floated={"right"} color={"red"} content={"Löschen"} icon='trash' labelPosition='left'
                                className={'delete-bttn'}
                                onClick={() => props.onDelete(props.object, confirmSuccess(props.onSuccess, "gelöscht"), confirmError(props.onError, "gelöscht"))}/> : null
                    }
                </Button.Group>
            </Responsive>
        </Grid.Column>
        <UnsavedChangesModal name={props.name}
                             show={showCancelModal}
                             onSuccess={props.onCancel}
                             onClose={() => setShowCancelModal(false)}
        />
    </Grid.Row>
}
