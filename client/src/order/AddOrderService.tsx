import * as React from "react";
import { useState } from "react";
import OrderItem from "./OrderItem";
import { ButtonProps, Dropdown, DropdownProps } from "semantic-ui-react";
import Product from "./Product";
import Input from "semantic-ui-react/dist/commonjs/elements/Input";
import Button from "semantic-ui-react/dist/commonjs/elements/Button";
import Icon from "semantic-ui-react/dist/commonjs/elements/Icon";

interface AddOrderServiceProps {
  services: Product[];
  orderItems: OrderItem[];
  onOrderItemsChanged: (orderItems: OrderItem[]) => void;
}

const AddOrderService: React.FC<AddOrderServiceProps> = (props: AddOrderServiceProps) => {
  const [amount, setAmount] = useState<number>(0);
  const [selectedProduct, setSelectedProduct] = useState<Product>();
  const inputRef = React.useRef<Input>();
  const addService = (event: React.MouseEvent<HTMLButtonElement>, data: ButtonProps) => {
    if (selectedProduct) {
      const updatedOrderServices: OrderItem[] = [...props.orderItems];
      updatedOrderServices.push({
        amount: amount,
        product: selectedProduct,
      });
      setAmount(0);
      setSelectedProduct(undefined);

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
          value={selectedProduct?.articleNumber || ""}
          search
          openOnFocus={false}
          selectOnNavigation={false}
          options={computeAvailableServices(props.orderItems, props.services)}
          onChange={(e, d) => selectService(d, props.services, setSelectedProduct)}
          placeholder=""
          noResultsMessage=""
        />
      </td>
      <td>
        <Dropdown
          fluid
          selection
          search
          value={selectedProduct?.articleNumber || ""}
          openOnFocus={false}
          selectOnNavigation={false}
          options={computeAvailableServicesByTitle(props.orderItems, props.services)}
          onChange={(e, d) => selectService(d, props.services, setSelectedProduct)}
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
  services: Product[]
): { key: string; value: string; text: string }[] => {
  const existingServices: (number | undefined)[] = orderItems.map((os: OrderItem) => os.product.id);
  return services
    .filter((service: Product) => !existingServices.includes(service.id))
    .filter((service: Product) => service.selectable)
    .map((s: Product) => {
      return { key: s.articleNumber, value: s.articleNumber, text: s.articleNumber };
    });
};

const computeAvailableServicesByTitle = (
  orderItems: OrderItem[],
  services: Product[]
): { key: string; value: string; text: string }[] => {
  const existingServices: (number | undefined)[] = orderItems.map((os: OrderItem) => os.product.id);
  return services
    .filter((service: Product) => !existingServices.includes(service.id))
    .filter((service: Product) => service.selectable)
    .map((s: Product) => {
      return { key: s.articleNumber, value: s.articleNumber, text: s.title };
    });
};

const selectService = (
  data: DropdownProps,
  services: Product[],
  setSelectedService: (s: Product | undefined) => void
) => {
  const selectedService = services.find((service: Product) => service.articleNumber === data.value);
  setSelectedService(selectedService);
};

export default AddOrderService;
