import * as React from "react";
import OrderList from "./OrderList";
import OrderEdit from "./OrderEdit";
import Company from "../contractors/Company";
import { useState } from "react";
import ClientTemplate from "../clientTemplate/ClientTemplate";
import Order from "./Order";
import ServiceCatlog from "./ServiceCatalog";

interface Props {
  company: Company;
  clientTemplates: ClientTemplate[];
  serviceCatalogs: ServiceCatlog[];
}

const OrderOverview: React.FC<Props> = (props: Props) => {
  const [selectedItem, setSelectedItem] = useState<Order>();
  const [edit, setEdit] = useState<boolean>(false);

  const handleSelection = (selectedOrder?: Order) => {
    setEdit(true);
    setSelectedItem(selectedOrder);
  };

  const stopEdit = () => {
    setEdit(false);
    setSelectedItem(undefined);
  };

  return (
    <React.Fragment>
      <div className={"order-overview"}>
        {edit ? null : <OrderList onAdd={() => setEdit(true)} onSelect={handleSelection} />}
        {!edit ? null : (
          <OrderEdit
            company={props.company}
            serviceCatalogs={props.serviceCatalogs}
            clientTemplates={props.clientTemplates}
            orderId={selectedItem?.id}
            onCancelEdit={stopEdit}
            onSave={stopEdit}
            onDelete={stopEdit}
          />
        )}
      </div>
    </React.Fragment>
  );
};

export default OrderOverview;
