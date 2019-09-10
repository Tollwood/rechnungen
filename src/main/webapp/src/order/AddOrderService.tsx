import * as React from "react";
import {ChangeEvent, createRef} from "react";
import OrderService from "./OrderService";
import {ButtonProps, Dropdown, DropdownProps} from "semantic-ui-react";
import Service from "./Service";
import Input from "semantic-ui-react/dist/commonjs/elements/Input";
import API from "../API";
import Button from "semantic-ui-react/dist/commonjs/elements/Button";

interface AddOrderServiceProps {
    orderServices: OrderService[]
    onOrderServicesAdded: (orderServices: OrderService[])=> void
}

interface AddOrderServiceState {
    availableServices: {key:string, value:string,text:string}[]
    amount:string
    selectedService?:Service
    services: Service[]
}

export default class AddOrderService extends React.Component<AddOrderServiceProps,AddOrderServiceState> {
    private inputRef: React.RefObject<any>;

    constructor(props: AddOrderServiceProps) {
        super(props);
        this.state = {availableServices:[], services:[],amount:""}
        this.inputRef = createRef();
    }

    componentDidMount(): void {

        API.get(`/services`)
            .then(res => {
                console.log(res);
                console.log(res.data);
                return res.data;
            })
            .then(data => {
                this.setState(Object.assign(this.state, { availableServices: this.computeAvailableServices(data._embedded.services, this.props.orderServices), services: data._embedded.services}));
            });
    }

    componentDidUpdate(prevProps: Readonly<AddOrderServiceProps>, prevState: Readonly<AddOrderServiceState>, snapshot?: any): void {
        if(prevProps.orderServices.length !== this.props.orderServices.length){
            this.setState(Object.assign(this.state, { availableServices: this.computeAvailableServices(this.state.services,this.props.orderServices)}));
        }
    }

    render () {
        return (
            <tr >
                <td>
                    <Input style={{width: "80px"}}  value={this.state.amount} onChange={this.updateAmount.bind(this)} ref={this.inputRef}/>
                </td>
                 <td>
                     x
                 </td>
                <td>
                    <Dropdown
                        fluid
                        selection
                        search
                        openOnFocus={false}
                        selectOnNavigation={false}
                        options={this.state.availableServices}
                        onChange={this.selectService.bind(this)}
                        placeholder='Dienstleistung auswählen'
                    />
                </td>
                <td>
                    <Button icon="add" type="button" onClick={this.addService.bind(this)} />
                </td>
            </tr>
        );
    }

    private computeAvailableServices(services: Service[], orderServices: OrderService[]): {key:string, value:string,text:string}[] {

        const existingArticleNumbers: string[] = orderServices.map((os:OrderService) => os.service.articleNumber );
        return services
            .filter((service: Service) => !existingArticleNumbers.includes(service.articleNumber))
            .map((s: Service) => { return {key: s.articleNumber, value: s.articleNumber, text: s.title}} );
    }

    private updateAmount(event: ChangeEvent<HTMLInputElement>){
        this.setState(Object.assign(this.state,{amount: event.target.value}));
    }

    private selectService(event: React.SyntheticEvent<HTMLElement>, data: DropdownProps){
        const selectedService = this.state.services.find((service: Service) => service.articleNumber === data.value);
        console.log("Service selected: "+ JSON.stringify(selectedService));
        this.setState(Object.assign(this.state, {selectedService: selectedService }));
    }

    private addService(event: React.MouseEvent<HTMLButtonElement>, data: ButtonProps) {
        if(this.state.selectedService){
            const updatedOrderServices:OrderService[] =  Object.assign(this.props.orderServices);
            updatedOrderServices.push({amount: this.state.amount as unknown as number, service: this.state.selectedService});
            this.setState(Object.assign(this.state, {
                availableServices: this.computeAvailableServices(this.state.services,updatedOrderServices),
                amount:"",
                selectedService: null}));
            this.inputRef.current.focus();
            this.props.onOrderServicesAdded( updatedOrderServices)
        }
    }
}