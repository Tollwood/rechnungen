import * as React from "react";
import {Button, Form, Grid} from "semantic-ui-react";

interface RealEstateListProps {
    canSave: boolean
    onSave: () => void
    onCancel: () => void
    onDelete: () => void
    canDelete: boolean
}

export default class CUDButtons extends React.Component<RealEstateListProps> {

    render() {
        return <Grid.Row centered>
            <Grid.Column width={5} floated='left'>
                <Form.Button primary disabled={!this.props.canSave} content='Speichern' icon='save' labelPosition='left' onClick={this.props.onSave}/>
            </Grid.Column>
            <Grid.Column width={5}>
                <Button content='Abbrechen' icon='cancel' labelPosition='left' onClick={this.props.onCancel}/>
            </Grid.Column>
            <Grid.Column width={5} floated='right'>
                {this.props.canDelete ?
                    <Button floated={"right"} color={"red"} content={"Löschen"} icon='trash' labelPosition='left'
                            onClick={this.props.onDelete}/> : null
                }
            </Grid.Column>
        </Grid.Row>

    }

}
