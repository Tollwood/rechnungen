import * as React from "react";
import OrderItem from "./order/OrderItem";
import {Grid, Image, List, Segment, Container} from "semantic-ui-react";
import Service from "./order/Service";
import OrderCount from "./OrderCount";

interface Props {
    services: OrderCount[]
}

export default function OrderConfirm(props: Props) {
    function renderItem(service: OrderCount) {
        return <List.Item>
            <Image src={service.service.image} avatar/>
            <List.Content>
                <List.Header as='a'>{service.amount} x {service.service.title}</List.Header>
                <List.Description as='a'>{service.service.description}</List.Description>
            </List.Content>
        </List.Item>;
    }

    return <Container text>
        <Image src='/SassLogo.png' style={{width: "600px"}} centered/>
        <Grid centered>
            <Grid.Row>
                <Grid.Column width={12} textAlign={"center"}>
                    <h1>Vielen Dank für Ihre Bestellung</h1>
                </Grid.Column>
            </Grid.Row>

            <Grid.Row>
                <Grid.Column width={12} textAlign={"center"}>
                    Folgende Produke sind morgen für Sie ab 07:00 Uhr abholbereit.
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column width={6}>
                    <Segment>
                        <List divided relaxed>
                            {props.services.map(service => renderItem(service))}
                        </List>
                    </Segment>

                </Grid.Column>
            </Grid.Row>
        </Grid>
        <Image src='/teamsass.jpeg' centered/>
    </Container>


}