import * as React from "react";
import Service from "../order/Service";
import ServiceEdit from "./ServiceEdit";
import ServiceList from "./ServiceList";
import ClientTemplate from "../clientTemplate/ClientTemplate";
import { useState } from "react";

interface Props {
    clientTemplates: ClientTemplate[]
}

const ServicesOverview: React.FC<Props>=(props:Props)=> {

    const [selectedItem,setSelectedItem] = useState<Service>();
    
    function handleAdd(clientTemplate:ClientTemplate) {
        const service = new Service();
        service.serviceCatalogId = clientTemplate.serviceCatalogId;
        setSelectedItem(service);
    }

    function handleSelection(selectedItem: Service) {
        setSelectedItem( selectedItem);
    }

    function handleCancelEdit() {
        setSelectedItem(undefined);
    }
    return (
            <div className={"service-overview"}>
                {selectedItem ? <ServiceEdit
                        service={selectedItem}
                        onCancelEdit={handleCancelEdit}
                        onSave={handleCancelEdit}
                        onDelete={handleCancelEdit}
                    />: 
                    <ServiceList
                    clientTemplates={props.clientTemplates}
                                 onAdd={handleAdd}
                                 onSelect={(service: Service) => {
                                     handleSelection(service)
                                 }}

                    />}
                
            </div>

        );
    

}
export default ServicesOverview;
