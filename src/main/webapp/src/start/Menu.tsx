import * as React from "react";
import {ContentType} from "./ContentType";
import {Content} from "./Content";
import {MenuCard} from "./MenuCard";
import {Card, Grid, Icon} from "semantic-ui-react";

interface MenuState {
    contents: Content[]
}

interface MenuProps {
    activeContent: ContentType,
    onMenuChanges: (content: ContentType) => void
}

export class Menu extends React.Component<MenuProps, MenuState> {

    constructor(props: MenuProps) {
        super(props);
        this.state = {
            contents: [
                new Content(ContentType.ORDER, "Auftragsübersicht", "unordered list","orderOverviewCard"),
                //new Content(ContentType.BILL, "Rechnungen", "money bill alternate"),
                //new Content(ContentType.STATISTICS, "Statistiken", "chart line"),
                new Content(ContentType.EMPLOYEE, "Mitarbeiterverwaltung", "address card", "employeeOverviewCard"),
                new Content(ContentType.REAL_ESTATE, "Liegenschaften Verwalten", "home","realEstateOverviewCard"),
            ]
        }
    }


    render() {
        if (this.props.activeContent === ContentType.NONE) {
            return (
                <Grid.Row >
                    <Grid.Column computer={8} tablet={12} mobile={16} textAlign={'center'} >
                        <div id={"menu-conainter"}>
                            <Card.Group itemsPerRow={2}>
                                {this.state.contents.map((content: Content) => <MenuCard key={content.type} content={content}
                                                                                         onClick={this.props.onMenuChanges}/>)}
                            </Card.Group>
                        </div>
                    </Grid.Column>
                </Grid.Row>)

        } else if (this.state.contents.find((content: Content) => this.props.activeContent === content.type)) {
            return (
                <Grid.Row>
                    <Grid.Column computer={8} tablet={12} mobile={16}>
                        <h1>
                            <Icon name={this.getContent(this.props.activeContent).icon}/>
                            <span className={"menu-title"}>{this.getContent(this.props.activeContent).title}</span>
                            <Icon className={"close"} style={{float:"right" }} name={"close"} size={"small"} onClick={() => {
                                this.props.onMenuChanges(ContentType.NONE)
                            }}/>
                        </h1>

                    </Grid.Column>
                </Grid.Row>)
        }
        return <span/>

    }

    private getContent(type: ContentType): Content {
        return this.state.contents.filter((value: Content) => value.type === type)[0];
    }
}