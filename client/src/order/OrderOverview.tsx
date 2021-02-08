import * as React from "react";
import OrderEdit from "./OrderEdit";
import Company from "../employees/Company";
import { useState } from "react";
import ClientTemplate from "../clientTemplate/ClientTemplate";
import Order from "./Order";
import ServiceCatlog from "./ServiceCatalog";
import OrderListNew from "./Orders";

interface Props {
  company: Company;
  clientTemplates: ClientTemplate[];
  serviceCatalogs: ServiceCatlog[];
}

const OrderOverview: React.FC<Props> = (props: Props) => {
  const [selectedItem, setSelectedItem] = useState<Order>();
  const [edit, setEdit] = useState<boolean>(false);

  const handleSelection = (selectedOrder?: Order) => {
    setSelectedItem(selectedOrder);
    setEdit(true);
  };

  const stopEdit = () => {
    setEdit(false);
    setSelectedItem(undefined);
  };

  return (
    <div className={"order-overview"}>
      {edit ? null : <OrderListNew onSelect={handleSelection} />}
      {!edit ? null : (
        <OrderEdit
          company={props.company}
          serviceCatalogs={props.serviceCatalogs}
          clientTemplates={props.clientTemplates}
          order={selectedItem}
          onCancelEdit={stopEdit}
          onSave={stopEdit}
          onDelete={stopEdit}
        />
      )}
    </div>
  );
};

export default OrderOverview;
