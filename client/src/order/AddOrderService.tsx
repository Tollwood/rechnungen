import * as React from "react";
import { useState } from "react";
import OrderItem from "./OrderItem";
import { ButtonProps, Dropdown, DropdownProps } from "semantic-ui-react";
import Service from "./Service";
import Input from "semantic-ui-react/dist/commonjs/elements/Input";
import Button from "semantic-ui-react/dist/commonjs/elements/Button";
import Icon from "semantic-ui-react/dist/commonjs/elements/Icon";

interface AddOrderServiceProps {
  services: Service[];
  orderItems: OrderItem[];
  onOrderItemsChanged: (orderItems: OrderItem[]) => void;
}

const AddOrderService: React.FC<AddOrderServiceProps> = (props: AddOrderServiceProps) => {
  const [amount, setAmount] = useState<number>(0);
  const [selectedService, setSelectedService] = useState<Service>();
  const inputRef = React.useRef<Input>();
  const addService = (event: React.MouseEvent<HTMLButtonElement>, data: ButtonProps) => {
    if (selectedService) {
      const updatedOrderServices: OrderItem[] = [...props.orderItems];
      updatedOrderServices.push({
        amount: amount,
        service: selectedService,
      });
      setAmount(0);
      setSelectedService(undefined);

      inputRef.current?.focus();
      console.log(updatedOrderServices);
      props.onOrderItemsChanged(updatedOrderServices);
    }
  };

  return (
    <tr>
      <td>
        <Input
          style={{ width: "80px" }}
          value={amount}
          onChange={(e) => setAmount(Number.parseInt(e.target.value))}
          type="number"
          inputRef={inputRef}
        />
      </td>
      <td>
        <Dropdown
          fluid
          selection
          value={selectedService?.articleNumber || ""}
          search
          openOnFocus={false}
          selectOnNavigation={false}
          options={computeAvailableServices(props.orderItems, props.services)}
          onChange={(e, d) => selectService(d, props.services, setSelectedService)}
          placeholder=""
          noResultsMessage=""
        />
      </td>
      <td>
        <Dropdown
          fluid
          selection
          search
          value={selectedService?.articleNumber || ""}
          openOnFocus={false}
          selectOnNavigation={false}
          options={computeAvailableServicesByTitle(props.orderItems, props.services)}
          onChange={(e, d) => selectService(d, props.services, setSelectedService)}
          placeholder="Dienstleistung auswählen"
        />
      </td>
      <td>
        <Button color={"green"} onClick={addService}>
          <Icon name={"add"} />
        </Button>
      </td>
    </tr>
  );
};

const computeAvailableServices = (
  orderItems: OrderItem[],
  services: Service[]
): { key: string; value: string; text: string }[] => {
  const existingServices: (number | undefined)[] = orderItems.map((os: OrderItem) => os.service.id);
  return services
    .filter((service: Service) => !existingServices.includes(service.id))
    .filter((service: Service) => service.selectable)
    .map((s: Service) => {
      return { key: s.articleNumber, value: s.articleNumber, text: s.articleNumber };
    });
};

const computeAvailableServicesByTitle = (
  orderItems: OrderItem[],
  services: Service[]
): { key: string; value: string; text: string }[] => {
  const existingServices: (number | undefined)[] = orderItems.map((os: OrderItem) => os.service.id);
  return services
    .filter((service: Service) => !existingServices.includes(service.id))
    .filter((service: Service) => service.selectable)
    .map((s: Service) => {
      return { key: s.articleNumber, value: s.articleNumber, text: s.title };
    });
};

const selectService = (
  data: DropdownProps,
  services: Service[],
  setSelectedService: (s: Service | undefined) => void
) => {
  const selectedService = services.find((service: Service) => service.articleNumber === data.value);
  setSelectedService(selectedService);
};

export default AddOrderService;
