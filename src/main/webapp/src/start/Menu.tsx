import * as React from "react";
import {ContentType} from "./ContentType";
import {Content} from "./Content";
import {MenuCard} from "./MenuCard";
import {Card, Grid, Icon} from "semantic-ui-react";
import OrderSearch from "../order/OrderSearch";
import Order from "../order/Order";

interface State {
    contents: Content[]
}

interface Props {
    activeContent: ContentType,
    onMenuChanges: (content: ContentType) => void
    onOpenOrder: (orde: Order) => void
}

export class Menu extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            contents: [
                new Content(ContentType.ORDER, "Aufträge", "unordered list", "order-overview-card"),
                new Content(ContentType.EMPLOYEE, "Mitarbeiter", "address card", "employee-overview-card"),
                new Content(ContentType.REAL_ESTATE, "Liegenschaften", "home", "realEstate-overview-card"),
                new Content(ContentType.SERVICES, "Dienstleistungen", "sign language", "service-overview-card"),
            ]
        }
    }


    render() {
        if (this.props.activeContent === ContentType.NONE) {
            return (
                <React.Fragment>
                    <Grid.Row>
                        <Grid.Column textAlign={'center'} computer={3} tablet={12} mobile={16}>
                            <OrderSearch onSelected={this.props.onOpenOrder.bind(this)}/>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column computer={8} tablet={12} mobile={16} textAlign={'center'}>
                            <div id={"menu-conainter"}>
                                <Card.Group itemsPerRow={2}>
                                    {this.state.contents.map((content: Content) => <MenuCard key={content.type} content={content}
                                                                                             onClick={this.props.onMenuChanges}/>)}
                                </Card.Group>
                            </div>
                        </Grid.Column>
                    </Grid.Row>
                </React.Fragment>)

        } else if (this.state.contents.find((content: Content) => this.props.activeContent === content.type)) {
            return (
                <Grid.Row>
                    <Grid.Column computer={8} tablet={12} mobile={16}>
                        <h1>
                            <Icon name={this.getContent(this.props.activeContent).icon}/>
                            <span className={"menu-title"}>{this.getContent(this.props.activeContent).title}</span>
                            <Icon className={"close"} style={{float: "right"}} name={"close"} size={"small"} onClick={() => {
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