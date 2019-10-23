import * as React from "react";
import {Button, Form, Grid} from "semantic-ui-react";

interface RealEstateListProps {
    onSave: () => void
    onCancel: () => void
    onDelete: () => void
    canDelete: boolean
}

export default class CUDButtons extends React.Component<RealEstateListProps> {

    render() {
        return <Grid.Row centered>
            <Grid.Column width={5} floated='left'>
                <Form.Button primary content='Speichern' icon='save' labelPosition='left' onClick={this.props.onSave} className={'save-bttn'}/>
            </Grid.Column>
            <Grid.Column width={5}>
                <Button content='Abbrechen' icon='cancel' labelPosition='left' onClick={this.props.onCancel} className={'cancel-bttn'}/>
            </Grid.Column>
            <Grid.Column width={5} floated='right'>
                {this.props.canDelete ?
                    <Button floated={"right"} color={"red"} content={"Löschen"} icon='trash' labelPosition='left' className={'delete-bttn'}
                            onClick={this.props.onDelete}/> : null
                }
            </Grid.Column>
        </Grid.Row>

    }
}
