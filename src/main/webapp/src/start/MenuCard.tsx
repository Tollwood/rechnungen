import {Card, Icon} from "semantic-ui-react";
import * as React from "react";
import {Content} from "./Content";
import {ContentType} from "./ContentType";

export class MenuCard extends React.Component<{content: Content, onClick: (content: ContentType)=> void}> {

    render() {
        return (

            <Card className={this.props.content.className} onClick={ ()=>{
                console.log("click");
                this.props.onClick(this.props.content.type)}}>
                <Card.Header textAlign={'center'} >
                    <Icon name={this.props.content.icon} size='massive' style={{margin: "5px"}} />
                </Card.Header>
                <Card.Content textAlign={'center'}>
                    <span>{this.props.content.title}</span>
                </Card.Content>
            </Card>

        );

    }
}