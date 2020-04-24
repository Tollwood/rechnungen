import * as React from "react";
import Company from "./employees/Company";
import {Header, Grid} from "semantic-ui-react";

interface Props {
    company: Company
}

export default function AppHeader(props: Props) {
    return <Grid.Row centered>
        <Grid.Column computer={12} tablet={12} mobile={16}>
            <Header as='h1' textAlign={"center"} className="header-title" image={props.company.logo} content={props.company.name}/>
        </Grid.Column>
    </Grid.Row>
}