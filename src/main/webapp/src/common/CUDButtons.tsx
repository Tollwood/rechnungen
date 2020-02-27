import * as React from "react";
import {Button, Form, Grid} from "semantic-ui-react";
import {useAlert} from "react-alert";

interface Props {
    onSave: (object: any, onSuccess: () => void, onError: (errors: Map<string, string>) => void) => void
    object: any
    name: string
    onSuccess: () => void
    onCancel: () => void
    onDelete: (object: any, onSuccess: () => void, onError: (errors: Map<string, string>) => void) => void
    onError: (errors: Map<string, string>) => void
    canDelete: boolean
}

export default function CUDButtons(props: Props) {

    const alert = useAlert();

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

    return <Grid.Row centered>
        <Grid.Column width={5} floated='left'>
            <Form.Button primary content='Speichern' icon='save' labelPosition='left'
                         onClick={() => props.onSave(props.object, confirmSuccess(props.onSuccess, "gepeichert"), confirmError(props.onError, "gepeichert"))}
                         className={'save-bttn'}/>
        </Grid.Column>
        <Grid.Column width={5}>
            <Button content='Abbrechen' icon='cancel' labelPosition='left' onClick={props.onCancel} className={'cancel-bttn'}/>
        </Grid.Column>
        <Grid.Column width={5} floated='right'>
            {props.canDelete ?
                <Button floated={"right"} color={"red"} content={"Löschen"} icon='trash' labelPosition='left' className={'delete-bttn'}
                        onClick={() => props.onDelete(props.object, confirmSuccess(props.onSuccess, "gelöscht"), confirmError(props.onError, "gelöscht"))}/> : null
            }
        </Grid.Column>
    </Grid.Row>
}
