import * as React from "react";
import { Button, Form, Grid, Segment } from "semantic-ui-react";
import Order from "./Order";
import Contractor from "../contractors/Contractor";
import OrderItem from "./OrderItem";
import ListOrderServices from "./ListOrderServices";
import RealEstate from "../realestate/RealEstate";
import Service from "./Service";
import OrderBaseProperties from "./OrderBaseProperties";
import OrderAppointments from "./OrderAppointments";
import OrderStatusSteps from "./OrderStatusSteps";
import { OrderStatus } from "./OrderStatus";
import Helper from "../common/Helper";
import BillDetails from "./BillDetails";
import BillButton from "./BillButton";
import PaymentRecieved from "./PaymentRecieved";
import OrderKmPauschale from "./OrderKmPauschale";
import Company from "../contractors/Company";
import ErrorMapper from "../ErrorMapper";
import DeleteModal from "../DeleteModal";
import { OrderAddButton } from "./OrderAddButton";
import OrderService from "./OrderService";
import RealEstateService from "../realestate/RealEstateService";
import ServiceService from "../services/ServiceService";
import ContractorService from "../contractors/ContractorService";
import UnsavedChangesModal from "../UnsavedChangesModal";
import ClientTemplate from "../clientTemplate/ClientTemplate";
import ServicesOverview from "../services/ServicesOverview";
import ServiceCatlog from "./ServiceCatalog";

interface Props {
  onSave: () => void;
  onCancelEdit: () => void;
  onDelete: () => void;
  orderId?: number;
  company: Company;
  clientTemplates: ClientTemplate[];
  serviceCatalogs: ServiceCatlog[];
}

const OrderEdit: React.FC<Props> = (props: Props) => {
  const [order, setOrder] = React.useState<Order | undefined>(props.orderId ? undefined : new Order());
  const [initialState, setInitialState] = React.useState<Order>(new Order());
  const [contractors, setContractors] = React.useState<Contractor[]>([]);
  const [services, setServices] = React.useState<Service[]>([]);
  const [realEstates, setRealEstates] = React.useState<RealEstate[]>([]);
  const [showDeleteModal, setShowDeleteModal] = React.useState<boolean>(false);
  const [showUnsavedChangesModal, setShowUnsavedChangesModal] = React.useState<boolean>(false);
  const [errors, setErrors] = React.useState<Map<string, string>>(new Map<string, string>());

  React.useEffect(() => {
    if (props.orderId) {
      OrderService.getOrderById(props.orderId).then((o) => {
        if (o) {
          const uniqueOrderItems = o.orderItems.reduce<OrderItem[]>((unique, current) => {
            const x = unique.find((oi) => oi.service.articleNumber === current.service.articleNumber);
            if (!x) {
              return unique.concat([current]);
            } else {
              return unique;
            }
          }, []);
          o.orderItems = uniqueOrderItems;
        }
        console.log(o);
        setOrder(o);
      });
    }

    ContractorService.getContractors(setContractors);
    ServiceService.fetchServices(setServices);
    RealEstateService.fetchRealEstates(setRealEstates);
  }, [props.orderId]);

  if (order === undefined) {
    return <div>loading</div>;
  }

  return (
    <Segment>
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
            contractors={contractors}
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
          {order.status === "ORDER_BILL" && (
            <BillDetails order={order} handleOrderChange={handleOrderChange} errors={errors} />
          )}
          {order.status === "ORDER_BILL" && <BillButton company={props.company} order={order} services={services} />}
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
    </Segment>
  );

  function onDeleteSuccess() {
    setShowDeleteModal(false);
    props.onDelete();
  }

  function handleOrderChange(name: string, value: any) {
    setOrder({ ...order!, [name]: value });
    setErrors(ErrorMapper.removeError(errors, name));
  }

  function updateOrderServies(orderItems: OrderItem[]) {
    setOrder({ ...order!, orderItems: orderItems });
  }

  function onSuccessSave(savedOrder: Order) {
    savedOrder.contractor = order!.contractor;
    savedOrder.realEstate = order!.realEstate;
    setOrder(savedOrder);
    setInitialState(savedOrder);
  }
};

export default OrderEdit;
