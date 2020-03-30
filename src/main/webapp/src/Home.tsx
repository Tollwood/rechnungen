import * as React from "react";
import {useEffect, useState} from "react";
import {
    Accordion,
    AccordionTitleProps,
    Button,
    Card,
    Container,
    Form,
    Icon,
    Image,
    Input,
    InputOnChangeData,
    Segment
} from "semantic-ui-react";
import CustomerDetails from "./customer/CustomerDetails";
import ServiceService from "./services/ServiceService";
import OrderConfirm from "./OrderConfirm";
import Company from "./employees/Company";
import CompanyService from "./order/CompanyService";
import OrderService from "./order/OrderService";
import Order from "./order/Order";
import OrderCount from "./OrderCount";
import {DateInput} from "semantic-ui-calendar-react";
import Customer from "./customer/Customer";
import ErrorMapper from "./ErrorMapper";

export default function Home() {

    const [services, setServices] = useState<OrderCount[]>([]);

    function tomorrow() {
        var tomorrow = new Date();
        tomorrow.setDate(new Date().getDate() + 1);
        var dd = String(tomorrow.getDate()).padStart(2, '0');
        var mm = String(tomorrow.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = tomorrow.getFullYear();
        return dd + '.' + mm + '.' + yyyy;
    }

    const [wishDate, setWishDate] = useState<string>(tomorrow());
    const [completed, setCompleted] = useState<boolean>(false);
    const [activeIndex, setActiveIndex] = useState<number>(0);
    const [company, setCompany] = useState<Company>(new Company());
    const [customer, setCustomer] = useState<Customer>(new Customer());
    const [errors, setErrors] = useState<Map<string, string>>(new Map());

    useEffect(() => {
        document.title = "Bestellungen";
        CompanyService.get((result) => setCompany(result));
        ServiceService.fetchServices((result) => {
            setServices(result.map((s, index) => {
                return {service: s, amount: 0, index: index};
            }));
        });
    }, []);


    function handleClick(event: React.MouseEvent<HTMLDivElement>, data: AccordionTitleProps) {
        setActiveIndex(activeIndex === data.index ? -1 : data.index as number);
    }


    function updateCount(value: number, index: number) {
        const list = services.map((serviceCount, i) => {
            if (i === index) {
                serviceCount.amount = value;
                return serviceCount;
            } else {
                return serviceCount;
            }
        });
        setServices(list)
    }

    function onCustomerChange(name: string, value: any) {
        setCustomer(value);
        setErrors(ErrorMapper.removeError(errors, name));
    }

    function renderItem(serviceCount: OrderCount) {
        return <Card>
            <Image src='/broetchen.jpg' style={{width: "200px"}} wrapped centered/>
            <Card.Content>
                <Card.Header>{serviceCount.service.title}</Card.Header>
                <Card.Meta>
                    <span className='date'>{serviceCount.service.price} €</span>
                </Card.Meta>
                <Card.Description>
                    {serviceCount.service.description}
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Input style={{width: "80px"}} value={serviceCount.amount}
                       onChange={(event: React.ChangeEvent<HTMLInputElement>, data: InputOnChangeData) => {
                           updateCount(parseInt(data.value), serviceCount.index!)
                       }}/>
                <Button icon={"plus"} onClick={() => updateCount(serviceCount.amount + 1, serviceCount.index!)}/>
                <Button icon={"minus"}
                        onClick={() => updateCount(serviceCount.amount > 0 ? serviceCount.amount - 1 : 0, serviceCount.index!)}/>
            </Card.Content>
        </Card>;
    }

    function isBasketEmpty() {
        return services.filter(value => value.amount > 0).length === 0;
    }

    function onOrder() {
        let order = new Order(company._links.self!.href);
        order.services = services.filter(value => value.amount > 0).map((value) => {return {amount: value.amount, service: value.service._links.self!.href, _links : {service: value.service._links.self!} }});
        order.status = "ORDER_EXECUTE";
        order.firstAppointment = wishDate;
        order.customer = customer;
        OrderService.save(order, () => setCompleted(true), () => {
        });
    }

    function handleDateChange(e: any, data: {value: string}) {
        setWishDate(data.value);
    }

    function renderOrderEntry() {
        return <Container text>c
            <Image src='/SassLogo.png' style={{width: "600px"}} centered/>
            <Segment>Am Vortag bestellen und ganz gemütlich ohne Wartezeit am nächsten Tag abholen. </Segment>
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
                    <CustomerDetails readonly={false} customer={customer} onChange={onCustomerChange} errors={errors}/>
                    <Form.Field>
                        <label>Abholdatum</label>
                        <DateInput
                            dateFormat={"DD.MM.YYYY"}
                            minDate={'01.01.1990'}
                            hideMobileKeyboard={true}
                            name="firstAppointment"
                            placeholder="Abohldatum wählen"
                            value={wishDate ? wishDate : ''}
                            iconPosition="left"
                            onChange={handleDateChange}
                            error={errors.get('firstAppointment') ? {content: errors.get('firstAppointment')} : null}
                        />
                    </Form.Field>
                </Accordion.Content>
                <Accordion.Title
                    active={activeIndex === 1}
                    index={1}
                    onClick={handleClick}
                >
                    <Icon name='dropdown'/>
                    Produkte auswählen
                </Accordion.Title>
                <Accordion.Content active={activeIndex === 1}>
                    <Card.Group itemsPerRow={3}>
                        {services.map(service => renderItem(service))}
                    </Card.Group>
                </Accordion.Content>
            </Accordion>
            <Button primary content={"Jetzt bestellen"} floated={"right"} disabled={isBasketEmpty()} onClick={onOrder}/>
        </Container>
    }

    function renderOrderCompleted() {
        return <OrderConfirm services={services.filter(value => value.amount > 0)}/>
    }

    return completed ? renderOrderCompleted() : renderOrderEntry()


}