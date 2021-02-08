import * as React from "react";
import { Button, Container, Form, Grid } from "semantic-ui-react";
import Order from "./Order";
import Employee from "../employees/Employee";
import OrderItem from "./OrderItem";
import ListOrderServices from "./ListOrderServices";
import RealEstate from "../realestate/RealEstate";
import Service from "./Product";
import OrderBaseProperties from "./OrderBaseProperties";
import OrderAppointments from "./OrderAppointments";
import OrderStatusSteps from "./OrderStatusSteps";
import { OrderStatus } from "./OrderStatus";
import Helper from "../common/Helper";
import BillDetails from "./BillDetails";
import BillButton from "./BillButton";
import PaymentRecieved from "./PaymentRecieved";
import OrderKmPauschale from "./OrderKmPauschale";
import Company from "../employees/Company";
import ErrorMapper from "../ErrorMapper";
import DeleteModal from "../DeleteModal";
import { OrderAddButton } from "./OrderAddButton";
import OrderService from "./OrderService";
import RealEstateService from "../realestate/RealEstateService";
import ServiceService from "../services/ServiceService";
import EmployeeService from "../employees/EmployeeService";
import UnsavedChangesModal from "../UnsavedChangesModal";
import ClientTemplate from "../clientTemplate/ClientTemplate";
import ServicesOverview from "../services/ServicesOverview";
import ServiceCatlog from "./ServiceCatalog";
import { Paper } from "@material-ui/core";
import useStyles from "../useStyle";

interface Props {
  onSave: () => void;
  onCancelEdit: () => void;
  onDelete: () => void;
  order?: Order;
  company: Company;
  clientTemplates: ClientTemplate[];
  serviceCatalogs: ServiceCatlog[];
}

const OrderEdit: React.FC<Props> = (props: Props) => {
  const [order, setOrder] = React.useState<Order>(props.order ? props.order : new Order());
  const [initialState, setInitialState] = React.useState<Order>(new Order());
  const [technicians, setTechnicians] = React.useState<Employee[]>([]);
  const [services, setServices] = React.useState<Service[]>([]);
  const [realEstates, setRealEstates] = React.useState<RealEstate[]>([]);
  const [showDeleteModal, setShowDeleteModal] = React.useState<boolean>(false);
  const [showUnsavedChangesModal, setShowUnsavedChangesModal] = React.useState<boolean>(false);
  const [errors, setErrors] = React.useState<Map<string, string>>(new Map<string, string>());

  React.useEffect(() => {
    EmployeeService.getEmployees(setTechnicians);
    ServiceService.fetchServices(setServices);
    RealEstateService.fetchRealEstates(setRealEstates);
  }, []);
  const classes = useStyles();
  return (
    <Container maxWidth="lg" className={classes.container}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={classes.paper} style={{ height: "89vh", width: "100%" }}>
            <Form autoComplete={"off"}>
              <Grid>
                <OrderStatusSteps
                  status={order.status}
                  statusChanged={(status: OrderStatus) => handleOrderChange("status", status)}
                />
                <OrderBaseProperties
                  order={order}
                  clientTemplates={props.clientTemplates}
                  handleOrderChange={handleOrderChange}
                  realEstates={realEstates}
                  updateRealEstate={(realEstate?: RealEstate) =>
                    setOrder({ ...order, realEstate: realEstate, realEstateAddress: realEstate?.address })
                  }
                  technicians={technicians}
                  readOnly={order.status !== "ORDER_EDIT"}
                  updateClent={(clientTemplate: ClientTemplate) => {
                    console.log(clientTemplate);
                    setOrder({
                      ...order,
                      clientName: clientTemplate.name,
                      client: clientTemplate,
                      serviceCatalogId: clientTemplate.serviceCatalogId,
                    });
                  }}
                  errors={errors}
                />

                <OrderAppointments handleOrderChange={handleOrderChange} order={order} errors={errors} />
                {order.status === "ORDER_EDIT" || order.status === "ORDER_EXECUTE" ? (
                  <Grid.Row centered>
                    <Grid.Column width="8">
                      <ListOrderServices
                        order={order}
                        services={services}
                        onOrderItemsChanged={updateOrderServies}
                        onCatalogChanged={(serviceCatalogId: number) =>
                          handleOrderChange("serviceCatalogId", serviceCatalogId)
                        }
                      />
                    </Grid.Column>
                    <Grid.Column width="8" style={{ marginTop: "40px" }}>
                      <ServicesOverview
                        asPriceList={true}
                        serviceCatalogs={props.serviceCatalogs}
                        selectedServiceCatalog={props.serviceCatalogs.find((sc) => sc.id === order.serviceCatalogId)}
                      />
                    </Grid.Column>
                  </Grid.Row>
                ) : null}

                <OrderKmPauschale handleOrderChange={handleOrderChange} order={order} errors={errors} />
                {order.status === "ORDER_BILL" ? (
                  <BillDetails order={order} handleOrderChange={handleOrderChange} errors={errors} />
                ) : null}
                <BillButton company={props.company} order={order} services={services} />
                <PaymentRecieved order={order} handleOrderChange={handleOrderChange} errors={errors} />
                <Grid.Row centered>
                  <Grid.Column width={5} floated="left">
                    {order.status === Helper.nextStatus(order.status) ? null : (
                      <OrderAddButton
                        order={order}
                        realEstates={realEstates}
                        onSuccess={onSuccessSave}
                        onError={(errors: Map<string, string>) => {
                          setErrors(errors);
                        }}
                      />
                    )}
                  </Grid.Column>
                  <Grid.Column width={5}>
                    <Button
                      className={"cancel-bttn"}
                      content="Abbrechen"
                      icon="cancel"
                      labelPosition="left"
                      onClick={() => {
                        if (initialState !== order) {
                          setShowUnsavedChangesModal(true);
                        } else {
                          props.onCancelEdit();
                        }
                      }}
                    />
                  </Grid.Column>
                  <Grid.Column width={5} floated="right">
                    {order.id !== undefined && order.status !== "PAYMENT_RECIEVED" && (
                      <Button
                        className={"delete-bttn"}
                        floated={"right"}
                        color={"red"}
                        content={"Löschen"}
                        icon="trash"
                        labelPosition="left"
                        onClick={() => setShowDeleteModal(true)}
                      />
                    )}
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Form>
            <DeleteModal
              objectToDelete={"Auftrag"}
              show={showDeleteModal}
              onSuccess={() => {
                OrderService.delete(order, onDeleteSuccess);
              }}
              onClose={() => setShowDeleteModal(false)}
            />
            <UnsavedChangesModal
              name={"Auftrag"}
              show={showUnsavedChangesModal}
              onSuccess={props.onCancelEdit}
              onClose={() => setShowUnsavedChangesModal(false)}
            />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );

  function onDeleteSuccess() {
    setShowDeleteModal(false);
    props.onDelete();
  }

  function handleOrderChange(name: string, value: any) {
    setOrder({ ...order, [name]: value });
    setErrors(ErrorMapper.removeError(errors, name));
  }

  function updateOrderServies(orderItems: OrderItem[]) {
    setOrder({ ...order, orderItems: orderItems });
  }

  function onSuccessSave(savedOrder: Order) {
    savedOrder.technician = order.technician;
    savedOrder.realEstate = order.realEstate;
    setOrder(savedOrder);
    setInitialState(savedOrder);
  }
};

export default OrderEdit;
