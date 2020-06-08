import * as React from "react";
import {useEffect, useState} from "react";
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

export function Menu(props: Props) {

    const [contents, setContents] = useState<Content[]>([]);

    useEffect(() => {

        let contents: Content[] = [];

        contents.push(new Content(ContentType.ORDER, "Aufträge", "unordered list", "order-overview-card"));

        if (props.company.employeeSupport) {
            contents.push(new Content(ContentType.EMPLOYEE, "Mitarbeiter", "address card", "employee-overview-card"));
        }
        if (props.company.realEstateSupport) {
            contents.push(new Content(ContentType.REAL_ESTATE, "Liegenschaften", "home", "realEstate-overview-card"));
        }
        contents.push(new Content(ContentType.SERVICES, "Produkte", "sign language", "service-overview-card"));
        contents.push(new Content(ContentType.CATEGORIES, "Kategorien", "object group", "categories-overview-card"));
        contents.push(new Content(ContentType.COMPANY, "Firma", "building", "company-edit-card"));
        contents.push(new Content(ContentType.HOME, "Homepage", "edit outline", "hompage-edit-card"));
        if (props.company.statisticSupport) {
            contents.push(new Content(ContentType.STATISTICS, "Statistik", "chart line", "dashboard-overview-card"));
        }
        setContents(contents);
    }, [props.company]);

    function getContent(type: ContentType): Content {
        return contents.filter((value: Content) => value.type === type)[0];
    }

    if (props.activeContent === ContentType.NONE) {
        return (
            <React.Fragment>
                <Grid.Row>
                    <Grid.Column computer={12} tablet={12} mobile={16} textAlign={'center'}>
                        <div id={"menu-conainter"}>
                            <Card.Group itemsPerRow={2}>
                                {contents.map((content: Content) => <MenuCard key={content.type} content={content}
                                                                              onClick={props.onMenuChanges}/>)}
                            </Card.Group>
                        </div>
                    </Grid.Column>
                </Grid.Row>
            </React.Fragment>)

    } else if (contents.find((content: Content) => props.activeContent === content.type)) {
        return (
            <Grid.Row>
                <Grid.Column computer={12} tablet={12} mobile={16}>
                    <h1>
                        <Icon name={getContent(props.activeContent).icon}/>
                        <span className={"menu-title"}>{getContent(props.activeContent).title}</span>
                        <Icon className={"close"} style={{float: "right"}} name={"close"} size={"small"} onClick={() => {
                            props.onMenuChanges(ContentType.NONE)
                        }}/>
                    </h1>

                </Grid.Column>
            </Grid.Row>)
    }
    return <span/>;


}