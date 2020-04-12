import * as React from "react";
import {useState} from "react";
import {Button, Image, Menu, Responsive, Visibility, Message} from "semantic-ui-react";
import Statistic from "semantic-ui-react/dist/commonjs/views/Statistic";
import Company from "./employees/Company";

interface Props {
    productCount: number,
    totalPrice: number,
    company: Company
    onOrder: () => void,
    errors: Map<string,string>
    allowOrders: boolean
}

export default function Basket(props: Props) {

    const [menuFixed, setMenuFixed] = useState<boolean>(false);

    return  <Visibility
        onBottomPassed={() => setMenuFixed(true)}
        onBottomVisible={() => setMenuFixed(false)}
        once={false}
    >
        <Responsive minWidth={680}>

        <Menu
            fixed={menuFixed ? 'top' : undefined}
            widths={4}
            borderless
        >
            <Menu.Item>
                <Image src={props.company.logo} style={{width: "70px"}}/>
            </Menu.Item>
                <Menu.Item>
                    <Statistic horizontal label='Produkte' value={props.productCount} size={"mini"}/>
                </Menu.Item>
            <Menu.Item>
                <Statistic horizontal label='€ Gesamt' value={props.totalPrice.toLocaleString('de', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                })} size={"mini"}/>
            </Menu.Item>
            <Menu.Item>
                <Button primary content={"Jetzt bestellen"} icon={"cart"} floated={"right"} onClick={props.onOrder} disabled={!props.allowOrders}/>
            </Menu.Item>
        </Menu>
        </Responsive>
        <Responsive maxWidth={679}>
            <Menu
                fixed={menuFixed ? 'top' : undefined}
                widths={3}
                borderless
            >
                <Menu.Item>
                    <Image src={props.company.logo} style={{width: "70px"}}/>
                </Menu.Item>
                <Menu.Item>
                    <Statistic horizontal label='€ Gesamt' value={props.totalPrice.toLocaleString('de', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                    })} size={"mini"}/>
                </Menu.Item>
                <Menu.Item>
                    <Button primary icon={"cart"} floated={"right"} onClick={props.onOrder} disabled={!props.allowOrders}/>
                </Menu.Item>
            </Menu>
        </Responsive>
        {props.errors.get('services') && <Message negative>
            <p>Bittw wählen Sie mindestens ein Produkt aus</p>
        </Message>}
    </Visibility>
}