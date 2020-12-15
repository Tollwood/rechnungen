import * as React from "react";
import {ChangeEvent} from "react";
import OrderItem from "./OrderItem";
import Service from "./Service";
import Icon from "semantic-ui-react/dist/commonjs/elements/Icon";
import {Button, Table, Grid, Form, DropdownProps} from "semantic-ui-react";
import AddOrderService from "./AddOrderService";
import API from "../API";
import ServiceCatlog from "./ServiceCatalog";
import Order from "./Order";

interface Props {
    order:Order,
    services: Service[]
    orderServices: OrderItem[]
    onOrderServicesChanged: (orderServices: OrderItem[]) => void
    onCatalogChanged:(serviceCatalogId:number) => void
}

const ListOrderServices: React.FC<Props> = (props:Props)=> {
    
    const [serviceCatalogs,setServiceCatalogs] = React.useState<ServiceCatlog[]>([]);
    // const [selectedServiceCatalogId,setSelectedServiceCatalogId] = React.useState<number>();
    React.useEffect(()=>{
        API.get('/api/service-catalog')

        .then(res => res.data._embedded === undefined ? [] : res.data._embedded.serviceCatalog)
        .then(setServiceCatalogs)
    },[]);
    function mapCatalogToDropdownItems(){
        return serviceCatalogs.map((sc: ServiceCatlog) => {
            return {key: sc.name, value: sc.idValue, text: sc.name}
        });
    }
    function updateServiceCatalog(event: React.SyntheticEvent<HTMLElement>, data: DropdownProps){   
        // setSelectedServiceCatalogId(data.value as number);
        props.onCatalogChanged(data.value as number);
    }

    function renderRow (orderService: OrderItem) {

        let serviceData = props.services.find(service => service._links.self!.href === orderService._links.service.href);
        if (!serviceData) {
            return null;
        }

        return <tr key={serviceData.articleNumber}>
            <td>
                <input value={orderService.amount} onChange={(event: ChangeEvent<HTMLInputElement>) => {
                    updateOrderServiceAmount(orderService, event.target.value)
                }}/>
            </td>
            <td>{serviceData.articleNumber}</td>
            <td>{serviceData.title}</td>
            <td>
                <Button color={"red"} onClick={()=>removeOrderService(orderService)}><Icon name={"trash"}/></Button>
            </td>
        </tr>
    }

    function updateOrderServiceAmount(orderService: OrderItem, newValue: string) {
        const orderServices = props.orderServices.map((os: OrderItem) => {
            if (os._links.service.href === orderService._links.service.href) {
                return Object.assign(os, {amount: newValue});
            }
            return os;
        });
        props.onOrderServicesChanged(orderServices);
    }

    function removeOrderService(orderService: OrderItem) {
        props.onOrderServicesChanged(props.orderServices
            .filter((os: OrderItem) => orderService._links.service.href !== os._links.service.href));
    }
    
        return (
            <React.Fragment>
                <Grid.Row>
                                        <Grid.Column computer={6} tablet={6} mobile={8}>
                        <Form.Field>
                            <label>Produktkatalog </label>
                            <Form.Dropdown id="product-catalog"
                                           selection
                                           options={mapCatalogToDropdownItems()}
                                           value={props.order.serviceCatalogId }
                                           onChange={updateServiceCatalog}
    
                            />
                        </Form.Field>
                    </Grid.Column>
                
                    <Grid.Column computer={8} tablet={8} mobile={16}>
                        <h2>Dienstleistungen</h2>
                    </Grid.Column>
                </Grid.Row>
            <Grid.Row>
                <Grid.Column width={16}>
            <div>
                <Table className="ui compact celled table">
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell width={1}>Menge</Table.HeaderCell>
                            <Table.HeaderCell width={3}>Artikel Nr.</Table.HeaderCell>
                            <Table.HeaderCell width={11}>Dienstleistung</Table.HeaderCell>
                            <Table.HeaderCell width={1}></Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <tbody>
                    {props.orderServices.map(service => renderRow(service))}
                    <AddOrderService services={props.services.filter(s => s.serviceCatalogId === props.order.serviceCatalogId)} orderServices={props.orderServices}
                                     onOrderServicesAdded={props.onOrderServicesChanged}/>
                    </tbody>
                </Table>
            </div>
                </Grid.Column>
            </Grid.Row>
            </React.Fragment>

        );
    

        }        
export default ListOrderServices;