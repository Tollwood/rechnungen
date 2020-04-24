import * as React from "react";
import {ContentType} from "./ContentType";
import {Content} from "./Content";
import {MenuCard} from "./MenuCard";
import {Card, Grid, Icon} from "semantic-ui-react";
import Company from "../employees/Company";

interface State {
    contents: Content[]
}

interface Props {
    company: Company,
    activeContent: ContentType,
    onMenuChanges: (content: ContentType) => void
}

export class Menu extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        let contents: Content[] = [];

        contents.push(new Content(ContentType.ORDER, "Aufträge", "unordered list", "order-overview-card"));

        if(this.props.company.employeeSupport) {
            contents.push(new Content(ContentType.EMPLOYEE, "Mitarbeiter", "address card", "employee-overview-card"));
        }
        if(this.props.company.realEstateSupport){
            contents.push(new Content(ContentType.REAL_ESTATE, "Liegenschaften", "home", "realEstate-overview-card"));
        }
        contents.push(new Content(ContentType.SERVICES, "Dienstleistungen", "sign language", "service-overview-card"));
        contents.push(new Content(ContentType.CATEGORIES, "Kategorien", "object group", "categories-overview-card"));
        contents.push(new Content(ContentType.COMPANY, "Firma", "building", "company-edit-card"));
        if(this.props.company.statisticSupport) {
            contents.push(new Content(ContentType.STATISTICS, "Statistik", "chart line", "dashboard-overview-card"));
        }
        this.state = {
            contents: contents
        }
    }

    render() {
        if (this.props.activeContent === ContentType.NONE) {
            return (
                <React.Fragment>
                    <Grid.Row>
                        <Grid.Column computer={12} tablet={12} mobile={16} textAlign={'center'}>
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
                    <Grid.Column computer={12} tablet={12} mobile={16}>
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