import * as React from "react";
import {ContentType} from "./ContentType";
import {Content} from "./Content";
import {MenuCard} from "./MenuCard";
import {Grid, Icon, Card} from "semantic-ui-react";

interface MenuState {
    contents:Content[]
}

interface MenuProps {
    activeContent: ContentType,
    onMenuChanges: (content:ContentType)=>void
}

export class Menu extends React.Component<MenuProps,MenuState> {

    constructor(props: MenuProps) {
        super(props);
        this.state = {
            contents: [
                new Content(ContentType.ORDER,"Auftragsübersicht", "unordered list"),
                new Content(ContentType.BILL,"Rechnungen", "money bill alternate"),
                new Content(ContentType.STATISTICS,"Statistiken", "chart line"),
                new Content(ContentType.EMPLOYEE,"Mitarbeiterverwaltung", "address card"),
                new Content(ContentType.REAL_ESTATE,"Liegenschaften Verwalten", "home"),
            ]}
    }


    render() {
        if(this.props.activeContent === ContentType.NONE){
            return (<div id={"menu-conainter"} >
                <Card.Group itemsPerRow={2}>
                    {this.state.contents.map((content: Content)=> <MenuCard key={content.type} content={content} onClick={this.props.onMenuChanges}/>)}
                </Card.Group>
            </div>)

        }
        else if(this.state.contents.find((content: Content) => this.props.activeContent === content.type)) {
            return<div id={"menu-container"}>
                <Grid columns={3}>
                    <Grid.Column>
                        <Icon name={this.getContent(this.props.activeContent).icon} size='large' />
                    </Grid.Column>
                    <Grid.Column>
                        <h1>{this.getContent(this.props.activeContent).title}</h1>
                    </Grid.Column>
                    <Grid.Column>
                        <Icon name={"close"} onClick={()=>{this.props.onMenuChanges(ContentType.NONE)}}/>
                    </Grid.Column>
                </Grid>

            </div>
        }
        return <span/>

    }

    private getContent(type: ContentType):Content {
        return this.state.contents.filter((value:Content) => value.type === type)[0];
    }
}