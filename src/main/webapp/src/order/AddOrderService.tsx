import * as React from "react";
import {ChangeEvent, createRef} from "react";
import OrderService from "./OrderService";
import {ButtonProps, Dropdown, DropdownProps} from "semantic-ui-react";
import Service from "./Service";
import Input from "semantic-ui-react/dist/commonjs/elements/Input";
import Button from "semantic-ui-react/dist/commonjs/elements/Button";
import Icon from "semantic-ui-react/dist/commonjs/elements/Icon";

interface AddOrderServiceProps {
    services: Service[]
    orderServices: OrderService[]
    onOrderServicesAdded: (orderServices: OrderService[])=> void
}

interface AddOrderServiceState {
    amount:string
    selectedService?:Service
}

export default class AddOrderService extends React.Component<AddOrderServiceProps,AddOrderServiceState> {
    private inputRef: React.RefObject<any>;

    constructor(props: AddOrderServiceProps) {
        super(props);
        this.state = { amount:""};
        this.inputRef = createRef();
    }

    render () {
        return (
            <tr >
                <td>
                    <Input style={{width: "80px"}}  value={this.state.amount} onChange={this.updateAmount.bind(this)} ref={this.inputRef}/>
                </td>
                 <td >
                     <Dropdown
                         fluid
                         selection
                         value={this.state.selectedService? this.state.selectedService.articleNumber: ""}
                         search
                         openOnFocus={false}
                         selectOnNavigation={false}
                         icon='none'
                         options={this.computeAvailableServices()}
                         onChange={this.selectService.bind(this)}
                         placeholder=''
                         noResultsMessage=''
                     />
                 </td>
                <td>
                    <Dropdown
                        fluid
                        selection
                        search
                        value={this.state.selectedService? this.state.selectedService.articleNumber: ""}
                        openOnFocus={false}
                        selectOnNavigation={false}
                        options={this.computeAvailableServicesByTitle()}
                        onChange={this.selectService.bind(this)}
                        placeholder='Dienstleistung auswählen'
                    />
                </td>
                <td>
                    <Button color={"green"} onClick={this.addService.bind(this)}><Icon name={"add"}/></Button>
                </td>
            </tr>
        );
    }

    private computeAvailableServices( ): {key:string, value:string,text:string}[] {

        const existingServices: string[] = this.props.orderServices.map((os:OrderService) => os._links.service.href);
        return this.props.services
            .filter((service: Service) => !existingServices.includes(service._links.self!.href))
            .filter((service: Service) => service.selectable)
            .map((s: Service) => { return {key: s.articleNumber, value: s.articleNumber, text: s.articleNumber}} );
    }

    private computeAvailableServicesByTitle( ): {key:string, value:string,text:string}[] {

        const existingServices: string[] = this.props.orderServices.map((os:OrderService) => os._links.service.href);
        return this.props.services
            .filter((service: Service) => !existingServices.includes(service._links.self!.href))
            .filter((service: Service) => service.selectable)
            .map((s: Service) => { return {key: s.articleNumber, value: s.articleNumber, text: s.title}} );
    }

    private updateAmount(event: ChangeEvent<HTMLInputElement>){
        this.setState(Object.assign(this.state,{amount: event.target.value}));
    }

    private selectService(event: React.SyntheticEvent<HTMLElement>, data: DropdownProps){
        const selectedService = this.props.services.find((service: Service) => service.articleNumber === data.value);
        this.setState(Object.assign(this.state, {selectedService: selectedService }));
    }

    private addService(event: React.MouseEvent<HTMLButtonElement>, data: ButtonProps) {
        if(this.state.selectedService){
            const updatedOrderServices:OrderService[] =  Object.assign(this.props.orderServices);
            updatedOrderServices.push({amount: this.state.amount as unknown as number, service: this.state.selectedService._links.self!.href, _links: {service: {href:this.state.selectedService._links.self!.href}}});
            this.setState(Object.assign(this.state, {
                amount:"",
                selectedService: null}));
            this.inputRef.current.focus();
            this.props.onOrderServicesAdded( updatedOrderServices)
        }
    }
}