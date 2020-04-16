import Category from "./category/Category";
import * as React from "react";
import {Accordion, Card, Icon, Responsive} from "semantic-ui-react";
import OrderCount from "./OrderCount";
import ServiceCard from "./ServiceCard";

interface Props {
    orderCount: OrderCount[],
    index: number,
    activeIndex: number,
    category: Category,
    handleCategoryClick: (category: Category, index: number) => void,
    updateCount: (category: Category, updatedOrderCount: OrderCount) => void,
}

export default function CategoryAccordion(props: Props) {

    return <React.Fragment>
        <Accordion.Title
            active={props.activeIndex === props.index}
            index={props.index}
            onClick={() => props.handleCategoryClick(props.category, props.index)}
        >
            <Icon name='dropdown'/>
            {props.category.name}
        </Accordion.Title>
        <Accordion.Content active={props.activeIndex === props.index}>
            <Responsive maxWidth={480}>
                <Card.Group itemsPerRow={1}>
                    {props.orderCount
                        .sort((a, b) => {
                            if (a.service.title < b.service.title) {
                                return -1;
                            }
                            if (b.service.title < a.service.title) {
                                return 1;
                            }
                            return 0;
                        })
                        .map(service => <ServiceCard orderCount={service} updateCount={ (updatedCount)=> props.updateCount(props.category, updatedCount)}/>)}
                </Card.Group>
            </Responsive>
            <Responsive minWidth={481} maxWidth={720}>
                <Card.Group itemsPerRow={2}>
                    {props.orderCount.map(service => <ServiceCard orderCount={service} updateCount={(updatedCount)=> props.updateCount(props.category, updatedCount)}/>)}
                </Card.Group>
            </Responsive>
            <Responsive minWidth={721}>
                <Card.Group itemsPerRow={3}>
                    {props.orderCount.map(service => <ServiceCard orderCount={service} updateCount={(updatedCount)=> props.updateCount(props.category, updatedCount)}/>)}
                </Card.Group>
            </Responsive>
        </Accordion.Content>
    </React.Fragment>
}