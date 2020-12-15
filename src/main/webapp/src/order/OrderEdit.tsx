import * as React from "react";
import {Button, Form, Grid, Segment} from 'semantic-ui-react'
import Order from "./Order";
import Employee from "../employees/Employee";
import OrderItem from "./OrderItem";
import ListOrderServices from "./ListOrderServices";
import RealEstate from "../realestate/RealEstate";
import Service from "./Service";
import OrderBaseProperties from "./OrderBaseProperties";
import OrderAppointments from "./OrderAppointments";
import OrderStatusSteps from "./OrderStatusSteps";
import {OrderStatus} from "./OrderStatus";
import Helper from "../common/Helper";
import BillDetails from "./BillDetails";
import BillButton from "./BillButton";
import PaymentRecieved from "./PaymentRecieved";
import OrderKmPauschale from "./OrderKmPauschale";
import Company from "../employees/Company";
import ErrorMapper from "../ErrorMapper";
import Link from "../common/Links";
import DeleteModal from "../DeleteModal";
import {OrderAddButton} from "./OrderAddButton";
import OrderService from "./OrderService";
import RealEstateService from "../realestate/RealEstateService";
import ServiceService from "../services/ServiceService";
import EmployeeService from "../employees/EmployeeService";
import UnsavedChangesModal from "../UnsavedChangesModal";
import ClientTemplate from "../clientTemplate/ClientTemplate";

interface Props {
    onSave: () => void;
    onCancelEdit: () => void;
    onDelete: () => void;
    orderLink?: Link;
    company: Company;
    clientTemplates:ClientTemplate[]
}

 const  OrderEdit: React.FC<Props> = (props:Props) =>{
              
            const [order,setOrder] = React.useState<Order>(new Order());
            const [initialState,setInitialState] = React.useState<Order>(new Order());
            const [technicians,setTechnicians] = React.useState<Employee[]>([]);
            const [services,setServices] = React.useState<Service[]>([]);
            const [realEstates,setRealEstates] = React.useState<RealEstate[]>([]);
            const [showDeleteModal,setShowDeleteModal] = React.useState<boolean>(false);
            const [showUnsavedChangesModal,setShowUnsavedChangesModal] = React.useState<boolean>(false);
            const [errors,setErrors] = React.useState< Map<string, string>>(new Map<string, string>());
                        
        
            React.useEffect(()=>{
                EmployeeService.getEmployees(setTechnicians);
                ServiceService.fetchServices(setServices);
                RealEstateService.fetchRealEstates(setRealEstates);
            }
            ,[]);
            
            React.useEffect(()=>{
                const link = props.orderLink;
                if (link !== undefined && link !== null) {
                    OrderService.getOrder(link, setOrder);
                }
            },[props.orderLink]);
            
            React.useEffect(()=>{
                if (order._links.realEstate !== undefined){
                    RealEstateService.fetchCurrentRealEstate(order._links.realEstate, (realEstate) => {
                       if(order._links.technician !== undefined){
                        EmployeeService.fetchCurrentTechnician(order._links.technician, (emp) => {
                            setOrder({...order,realEstate:realEstate._links.self!.href, technician:emp._links.self!.href});
                        });
                       }
                       else{
                        setOrder({...order,realEstate:realEstate._links.self!.href});
                       }
                    });
                }
            },[order._links]);

            
        return (
            <Segment>
                <Form autoComplete={"off"}>
                    <Grid>
                        <OrderStatusSteps status={order.status}
                                          statusChanged={(status: OrderStatus) => handleOrderChange('status', status)}/>
                        <OrderBaseProperties order={order}
                                            clientTemplates={props.clientTemplates}
                                             selectedTechnician={getCurrentTechnician()}
                                             selectedRealEstate={OrderService.getCurrentRealEstate(order, realEstates)}
                                             handleOrderChange={handleOrderChange}
                                             realEstates={realEstates}
                                             updateRealEstate={(realEstate:RealEstate) => setOrder({...order,realEstate:realEstate._links.self!.href, realEstateAddress: realEstate.address })}
                                              technicians={technicians}
                                             readOnly={order.status !== 'ORDER_EDIT'}
                                             updateClent={(clientTemplate)=>{
                                                 setOrder({...order,clientName: clientTemplate.name,clientAddress:clientTemplate.address,serviceCatalogId:clientTemplate.serviceCatalogId})
                                             }}
                                             errors={errors}/>

                        <OrderAppointments handleOrderChange={handleOrderChange}
                                           order={order}
                                           errors={errors}/>
                        {order.status === 'ORDER_EDIT' || order.status === 'ORDER_EXECUTE' ?
                            <ListOrderServices order={order} services={services}
                                               orderServices={order.services ? order.services : []}
                                               onOrderServicesChanged={updateOrderServies}
                                               onCatalogChanged={(serviceCatalogId:number) => handleOrderChange("serviceCatalogId", serviceCatalogId)}/>
                            : null}
                        <OrderKmPauschale handleOrderChange={handleOrderChange}
                                          order={order}
                                          errors={errors}/>
                        {order.status === 'ORDER_BILL' ?
                            <BillDetails order={order} handleOrderChange={handleOrderChange}
                                         errors={errors}/> : null}
                        <BillButton company={props.company} order={order} services={services}
                                    technician={getCurrentTechnician()}
                                    realEstate={OrderService.getCurrentRealEstate(order, realEstates)}/>
                        <PaymentRecieved order={order} handleOrderChange={handleOrderChange}
                                         errors={errors}/>
                        <Grid.Row centered>
                            <Grid.Column width={5} floated='left'>
                                {order.status === Helper.nextStatus(order.status) ? null :
                                    <OrderAddButton order={order} realEstates={realEstates}
                                                    onSuccess={onSuccessSave}
                                                    onError={(errors: Map<string, string>) => {
                                                        setErrors(errors)
                                                    }}
                                    />}
                            </Grid.Column>
                            <Grid.Column width={5}>
                                <Button className={"cancel-bttn"} content='Abbrechen' icon='cancel' labelPosition='left'
                                        onClick={()=>{
                                            if(initialState !== order){
                                                setShowUnsavedChangesModal(true);
                                            }else {
                                                props.onCancelEdit();
                                            }
                                        }}/>
                            </Grid.Column>
                            <Grid.Column width={5} floated='right'>
                                {(order._links.self !== undefined && order.status !== "PAYMENT_RECIEVED") &&
                                    <Button className={"delete-bttn"} floated={"right"} color={"red"} content={"Löschen"} icon='trash'
                                            labelPosition='left'
                                            onClick={() => setShowDeleteModal(true)}/>
                                }
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Form>
                <DeleteModal objectToDelete={"Auftrag"}
                             show={showDeleteModal}
                             onSuccess={() => {
                                 OrderService.delete(order, onDeleteSuccess)
                             }}
                             onClose={() => setShowDeleteModal(false)}
                />
                <UnsavedChangesModal name={"Auftrag"}
                                     show={showUnsavedChangesModal}
                                     onSuccess={props.onCancelEdit}
                                     onClose={() => setShowUnsavedChangesModal(false)}
                />
            </Segment>
        );
    

    function onDeleteSuccess() {
        setShowDeleteModal( false);
        props.onDelete();
    }

    function handleOrderChange(name: string, value: any) {
        setOrder({...order, [name]: value});
        setErrors( ErrorMapper.removeError(errors, name));
    }

    function updateOrderServies(orderServices: OrderItem[]) {
        setOrder({...order, services: orderServices});
    }

    function getCurrentTechnician() {
        return technicians.find((technician: Employee) => technician._links.self!.href === order.technician);
    }

    function onSuccessSave(savedOrder: Order) {
        savedOrder.technician = order.technician;
        savedOrder.realEstate = order.realEstate;
        setOrder(savedOrder);
        setInitialState(savedOrder);
        
    }
}

export default OrderEdit;