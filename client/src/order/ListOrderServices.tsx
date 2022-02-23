import * as React from "react";
import { ChangeEvent } from "react";
import OrderItem from "./OrderItem";
import Service from "./Service";
import Icon from "semantic-ui-react/dist/commonjs/elements/Icon";
import { Button, Table, Grid, Form, DropdownProps } from "semantic-ui-react";
import AddOrderService from "./AddOrderService";
import API from "../API";
import ServiceCatlog from "./ServiceCatalog";
import Order from "./Order";

interface Props {
  order: Order;
  services: Service[];
  onOrderItemsChanged: (orderItems: OrderItem[]) => void;
  onCatalogChanged: (serviceCatalogId: number) => void;
}

const ListOrderServices: React.FC<Props> = (props: Props) => {
  const [serviceCatalogs, setServiceCatalogs] = React.useState<ServiceCatlog[]>([]);
  // const [selectedServiceCatalogId,setSelectedServiceCatalogId] = React.useState<number>();

  React.useEffect(() => {
    API.get("/api/service-catalogs")
      .then((res) => (res.data.data === undefined ? [] : res.data.data))
      .then(setServiceCatalogs);
  }, []);
  function mapCatalogToDropdownItems() {
    return serviceCatalogs.map((sc: ServiceCatlog) => {
      return { key: sc.name, value: sc.id, text: sc.name };
    });
  }
  function updateServiceCatalog(event: React.SyntheticEvent<HTMLElement>, data: DropdownProps) {
    // setSelectedServiceCatalogId(data.value as number);
    props.onCatalogChanged(data.value as number);
  }

  function renderRow(orderItem: OrderItem) {
    let serviceData = props.services.find((service) => service.id === orderItem.service.id);
    if (!serviceData) {
      return null;
    }

    return (
      <tr key={serviceData.articleNumber}>
        <td>
          <input
            value={orderItem.amount}
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              updateOrderServiceAmount(orderItem, event.target.value);
            }}
          />
        </td>
        <td>{serviceData.articleNumber}</td>
        <td>{serviceData.title}</td>
        <td>
          <Button color={"red"} onClick={() => removeOrderService(orderItem)}>
            <Icon name={"trash"} />
          </Button>
        </td>
      </tr>
    );
  }

  function updateOrderServiceAmount(orderService: OrderItem, newValue: string) {
    const orderServices = props.order.orderItems.map((os: OrderItem) => {
      if (os.id === orderService.id) {
        return { ...os, amount: Number.parseInt(newValue) };
      }
      return os;
    });
    props.onOrderItemsChanged(orderServices);
  }

  function removeOrderService(orderService: OrderItem) {
    props.onOrderItemsChanged(props.order.orderItems.filter((os: OrderItem) => orderService.id !== os.id));
  }

  return (
    <React.Fragment>
      <Grid.Row>
        <Grid.Column computer={6} tablet={6} mobile={8}>
          <Form.Field>
            <label>Servicekatalog</label>
            <Form.Dropdown
              id="service-catalog"
              selection
              options={mapCatalogToDropdownItems()}
              value={props.order.serviceCatalogId}
              onChange={updateServiceCatalog}
            />
          </Form.Field>
        </Grid.Column>

        <Grid.Column computer={8} tablet={8} mobile={16}>
          <h1>Dienstleistungen</h1>
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
                  <Table.HeaderCell width={7}>Dienstleistung</Table.HeaderCell>
                  <Table.HeaderCell width={1}></Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <tbody>
                {props.order.orderItems.map((orderItem) => renderRow(orderItem))}
                <AddOrderService
                  services={props.services.filter((s) => s.serviceCatalogId === props.order.serviceCatalogId)}
                  orderItems={props.order.orderItems}
                  onOrderItemsChanged={props.onOrderItemsChanged}
                />
              </tbody>
            </Table>
          </div>
        </Grid.Column>
      </Grid.Row>
    </React.Fragment>
  );
};
export default ListOrderServices;
