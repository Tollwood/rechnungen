import * as React from "react";
import {useEffect, useState} from "react";
import {Accordion, AccordionTitleProps, Container, Form, Icon, Image, Message, Segment} from "semantic-ui-react";
import ServiceService from "./services/ServiceService";
import Company from "./employees/Company";
import CompanyService from "./order/CompanyService";
import OrderService from "./order/OrderService";
import Order from "./order/Order";
import ErrorMapper from "./ErrorMapper";
import Category from "./category/Category";
import CustomerDetails from "./customer/CustomerDetails";
import Basket from "./Basket";
import OrderConfirm from "./OrderConfirm";
import CategoryService from "./category/CategoryService";
import CategoryAccordion from "./CategoryAccordion";
import Wishdate from "./WhishDate";
import OrderCount from "./OrderCount";
import {DateUtil} from "./common/DateUtil";
import OrderSummaryModal from "./OrderSummaryModal";

export default function Home() {

    const [orderCount, setOrderCount] = useState<Map<string, OrderCount[]>>(new Map());
    const [order, setOrder] = useState<Order>(new Order(""));
    const [errors, setErrors] = useState<Map<string, string>>(new Map());
    const [completed, setCompleted] = useState<boolean>(false);

    const [activeIndex, setActiveIndex] = useState<number>(0);
    const [company, setCompany] = useState<Company>(new Company());

    const [productCount, setProductCount] = useState<number>(0);
    const [totalPrice, setTotalPrice] = useState<number>(0);
    const [categories, setCategories] = useState<Category[]>([]);
    const [fetchedCategories, setfetchedCategories] = useState<string[]>([]);

    const [showOrderSummaryModal, setShowOrderSummaryModal] = useState<boolean>(false);
    const [allowOrders, setAllowOrders] = useState<boolean>(true);

    useEffect(() => {
        CompanyService.get((result: Company) => {
            setOrder({...order, company: result._links.self!.href, firstAppointment: DateUtil.tomorrowAsString()});
            setCompany(result);
        }).then(() => CategoryService.get((categories1 => {
            setCategories(categories1);
            categories1.map(value => fetchServicesForCategory(value));

        })));
    }, []);

    useEffect(() => {

        if(order.firstAppointment === undefined){
            setAllowOrders(true);
            return;
        }

        let wishdate = DateUtil.stringToDate(order.firstAppointment);
        let today = new Date();
        let inFuture= today.getDate() < wishdate.getDate();

        // no orders in the past
        if(!inFuture){
            setAllowOrders(false);
            return;
        }

        let isNextDay = DateUtil.isNextDay(today, wishdate);

        let day = today.getDay();
        let hours = today.getHours();

        // no orders on sunday
        if (isNextDay && [0].includes(day)) {
            setAllowOrders(false);
            return;
        }

        // no orders after 16 oclock mon-fri
        if (    isNextDay &&  hours >= 16 && [1, 2, 3, 4, 5].includes(day)) {
            setAllowOrders(false);
            return;
        }

        // no orders after 11 oclock on saturday (for sunday and monday)
        if (hours >= 11 && [6].includes(day) && (isNextDay || today.getDate() + 2 === wishdate.getDate())) {
            setAllowOrders(false);
            return;
        }

        setAllowOrders(true);

    }, [order.firstAppointment]);

    function fetchServicesForCategory(category: Category) {
        ServiceService.fetchServicesFromUrl(category._links.services!.href).then(value => setOrderCount(orderCount.set(category.name, value.map(s => {
            return {service: s, amount: 0};
        }))));
        setfetchedCategories(fetchedCategories.concat(category.name));
    }

    function handleClick(event: React.MouseEvent<HTMLDivElement>, data: AccordionTitleProps) {
        setActiveIndex(activeIndex === data.index ? -1 : data.index as number);
    }

    function updateCount(category: Category, updatedOrderCount: OrderCount) {

        const list = orderCount.get(category.name)!.map((serviceCount, i) => {
            if (serviceCount.service.articleNumber === updatedOrderCount.service.articleNumber) {
                setProductCount(productCount + updatedOrderCount.amount - serviceCount.amount);
                setTotalPrice((totalPrice + updatedOrderCount.amount * serviceCount.service.price - serviceCount.amount * serviceCount.service.price));
                serviceCount.amount = updatedOrderCount.amount;
                return serviceCount;
            } else {
                return serviceCount;
            }
        });
        setOrderCount(orderCount.set(category.name, list));
    }

    function onCustomerChange(name: string, value: any) {
        setOrder({...order, customer: value});
        setErrors(ErrorMapper.removeError(errors, name));
    }

    function onOrder() {

        let orderCounts: OrderCount[] = Array.from<OrderCount[]>(orderCount.values()).reduce((previousValue, currentValue) => previousValue.concat(currentValue), []);
        order.services = orderCounts.filter(value => value.amount > 0).map((value) => {
            return {amount: value.amount, service: value.service._links.self!.href, _links: {service: value.service._links.self!}}
        });
        order.status = "ORDER_EXECUTE";
        OrderService.save(order, company,() => setCompleted(true), (errors: Map<string, string>) => {
            setErrors(errors);
            setActiveIndex(0);
        });
    }

    function handleCategoryClick(category: Category, index: number) {
        setActiveIndex(activeIndex === index ? -1 : index);
    }

    function renderCategories() {
        let index: number = 1;
        return categories
            .filter( category => category.active)
            .filter(category => (category.name === "Sonntagsbrötchen" && DateUtil.isSundayOrder(order.firstAppointment)) || (category.name !== "Sonntagsbrötchen" && !DateUtil.isSundayOrder(order.firstAppointment)))
            .map(category => <CategoryAccordion index={index++} activeIndex={activeIndex}
                                                orderCount={orderCount.get(category.name) ? orderCount.get(category.name)! : []}
                                                category={category}
                                                handleCategoryClick={handleCategoryClick} updateCount={updateCount}/>);
    }

    function validateOrder(): Map<string, string> {

        let errors = new Map();
        if (order.customer.lastName === undefined) {
            errors.set("customer.lastName", "Pflichtfeld");
        }
        if (order.customer.phoneNumber === undefined) {
            errors.set("customer.phoneNumber", "Pflichtfeld");
        }
        if (orderCounts.filter(value => value.amount > 0).length === 0) {
            errors.set("services", "Pflichtfeld");
        }
        return errors
    }

    function renderOrderEntry() {

        return <Container text>
            <Form>
                <Image src={company.logo} wrapped centered/>
                <Message info>
                    <Message.Header>Aktuell sind noch keine Bestellungen möglich</Message.Header>
                    <p>Diese Seite befindet sich noch in der Entwicklung. Aktuell werden keine Bestellungen bearbeitet.</p>
                </Message>
                <Segment>Am Vortag bis 16 Uhr<sup>*</sup> bestellen und ganz gemütlich am nächsten Tag abholen.</Segment>
                <Basket productCount={productCount} totalPrice={totalPrice} company={company} onOrder={() => {
                    let newErrors = validateOrder();
                    if(newErrors.size === 0){
                        setShowOrderSummaryModal(true)
                    }else {
                        setErrors(newErrors);
                        setActiveIndex(0);
                    }
                }}
                        errors={errors}
                        allowOrders={allowOrders}/>
                <Accordion fluid styled>
                    <Accordion.Title
                        active={activeIndex === 0}
                        index={0}
                        onClick={handleClick}
                    >
                        <Icon name='dropdown'/>
                        Bestellung auf
                    </Accordion.Title>
                    <Accordion.Content active={activeIndex === 0}>
                        <CustomerDetails readonly={false} customer={order.customer} onChange={onCustomerChange}
                                         errors={ErrorMapper.childError(errors)}/>
                    </Accordion.Content>
                    <Accordion.Title>
                        <Wishdate handleDateChange={(date: string) => setOrder({...order, firstAppointment: date})} errors={errors}/>
                        {!allowOrders && <Message info>
                            <Message.Header>Bestellung zum {order.firstAppointment} leider nicht möglich.</Message.Header>
                            <p>Bitte wählen Sie ein späteren Abholtermin damit wir Ihnen die gewohnte Frische garantieren können.</p>
                            <p>Sie können Montag - Freitag bis 16 uhr und Samstags bis 11 Uhr für den Folgetag bestellen.</p>
                            <p>Bestellungen für Montag geben Sie bitte ebenfalls bis Samstag 11 Uhr auf. </p>
                        </Message>}
                    </Accordion.Title>
                    {renderCategories()}
                </Accordion>
            </Form>
            <OrderSummaryModal onSuccess={onOrder} onClose={() => setShowOrderSummaryModal(false)} show={showOrderSummaryModal}
                               orderCounts={orderCounts.filter(value => value.amount > 0)} customer={order.customer}
                               wishdate={order.firstAppointment!}/>
        </Container>
    }

    let orderCounts: OrderCount[] = Array.from<OrderCount[]>(orderCount.values()).reduce((previousValue, currentValue) => previousValue.concat(currentValue), []);
    return completed ?
        <OrderConfirm customer={order.customer} wishdate={order.firstAppointment!} services={orderCounts.filter(value => value.amount > 0)}
                      company={company}/> : renderOrderEntry()


}