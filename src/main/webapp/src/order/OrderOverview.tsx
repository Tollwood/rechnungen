import * as React from "react";
import OrderList from "./OrderList";
import OrderEdit from "./OrderEdit";
import Company from "../employees/Company";
import Link from "../common/Links";
import { useState } from "react";
import ClientTemplate from "../clientTemplate/ClientTemplate";

interface Props {
    company: Company
    clientTemplates: ClientTemplate[]
}

 const  OrderOverview: React.FC<Props> = (props:Props)=> {

    const [selectedItem,setSelectedItem] = useState<Link>();
    const [edit,setEdit] = useState<boolean>(false);


    const handleSelection = (selectedOrderLink?: Link) => {
        setEdit( true);
        setSelectedItem(selectedOrderLink);
    }

    const stopEdit = ()=>  {
        setEdit( false);
        setSelectedItem(undefined);
    }
   
        return (
            <React.Fragment>
                <div className={"order-overview"}>
                    {edit ? null :
                        <OrderList onAdd={()=>setEdit(true)}
                                   onSelect={handleSelection}
                        />}
                    {!edit ? null :
                        <OrderEdit
                            company={props.company}
                            clientTemplates={props.clientTemplates}
                            orderLink={selectedItem}
                            onCancelEdit={stopEdit}
                            onSave={stopEdit}
                            onDelete={stopEdit}
                        />}
                </div>
            </React.Fragment>

        );
   
}

export default OrderOverview;