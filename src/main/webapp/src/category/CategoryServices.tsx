import * as React from "react";
import {useEffect, useState} from "react";
import Service from "../order/Service";
import RLDD from "react-list-drag-and-drop/lib/RLDD";
import {Card, Image} from "semantic-ui-react";
import Category from "./Category";
import ServiceItem from "./ServiceItem";

interface Props {
    category: Category
    services: Service[]
    onChange: (category: Category) => void
}

export default function CategoryServices(props: Props) {

    const [services, setServices] = useState<Array<ServiceItem>>([]);

    useEffect(() => {
        let mapped: ServiceItem[] = props.services.map((value) => {
            let newIndex = props.category.categoryServiceOrder.findIndex(value1 => value1.href === value._links.self!.href);

            return {id: newIndex === -1? 90000: newIndex, service: value}
        }).sort((a, b) => ((a.id < b.id) ? -1 : ((a.id > b.id) ? 1 : 0)))
            .map((value, index) => {return {id: index, service: value.service}});
        setServices(mapped);
    }, [props.services]);

    function itemRenderer(serviceItem: ServiceItem, index: number): JSX.Element {
        return <Card>
            <Card.Content>
                <Image
                    avatar
                    floated={"left"}
                    src={serviceItem.service.image}
                />
                <Card.Header>{serviceItem.service.title}</Card.Header>
                <Card.Meta>{serviceItem.service.articleNumber}</Card.Meta>
                <Card.Description>
                    {serviceItem.service.description}
                </Card.Description>
            </Card.Content>
        </Card>
    }

    function handleRLDDChange(reorderedItems: Array<ServiceItem>) {
        setServices(reorderedItems);
        let newCategory: Category = {
            ...props.category, "categoryServiceOrder": reorderedItems.map((value, index) => {
                return {index: index, href: value.service._links.self!.href};
            })
        };
        props.onChange(newCategory);
    }

    return <React.Fragment>
        <h1>Produkte</h1>
        <h5>Reihenfolge via drag and drop festlegen. Funktioniert nicht auf dem Handy</h5>
        <RLDD
            cssClasses="list-container"
            items={services}
            itemRenderer={itemRenderer}
            onChange={handleRLDDChange}
        />
    </React.Fragment>
}
