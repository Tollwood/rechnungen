import * as React from "react";
import {Button, Card, Image, Input, InputOnChangeData} from "semantic-ui-react";
import OrderCount from "./OrderCount";

interface Props {
    orderCount: OrderCount,
    updateCount: (updatedOrderCount: OrderCount)=>void
}

export default function ServiceCard(props: Props) {

    return <Card>
        <Image src={props.orderCount.service.image} style={{width: "200px"}} wrapped centered/>
        <Card.Content>
            <Card.Header>{props.orderCount.service.title}</Card.Header>
            <Card.Meta>
                    <span className='date'>{props.orderCount.service.price.toLocaleString('de', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                    })} €</span>
            </Card.Meta>
            <Card.Description>
                {props.orderCount.service.description}
            </Card.Description>
        </Card.Content>
        <Card.Content extra>
            <Input style={{width: "70px"}} value={props.orderCount.amount}
                   onChange={(event: React.ChangeEvent<HTMLInputElement>, data: InputOnChangeData) => {
                       props.updateCount({amount: parseInt(data.value), service: props.orderCount.service});
                   }}/>
            <Button icon={"plus"} onClick={() => props.updateCount({amount: props.orderCount.amount + 1,  service: props.orderCount.service})}/>
            <Button icon={"minus"}
                    onClick={() => props.updateCount({amount: props.orderCount.amount > 0 ? props.orderCount.amount - 1 : 0, service: props.orderCount.service})}/>
        </Card.Content>
    </Card>;

}