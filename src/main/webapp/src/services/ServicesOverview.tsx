import * as React from "react";
import Service from "../order/Service";
import ServiceEdit from "./ServiceEdit";
import ServiceList from "./ServiceList";
import { useState } from "react";
import ServiceCatlog from "../order/ServiceCatalog";

interface Props {
    serviceCatalogs: ServiceCatlog[]
}

const ServicesOverview: React.FC<Props>=(props:Props)=> {

    const [selectedItem,setSelectedItem] = useState<Service>();
    const [selectedServiceCatlog,setSelectedServiceCatlog] = useState<ServiceCatlog>();

    function handleAdd() {
        const service = new Service();
        service.serviceCatalogId = selectedServiceCatlog!.idValue;
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
                    serviceCatalogs={props.serviceCatalogs}
                                 onAdd={handleAdd}
                                 onSelect={(service: Service) => {
                                     handleSelection(service)
                                 }}
                                 onProductCatalogSelect={setSelectedServiceCatlog}
                                 selectedServiceCatalog={selectedServiceCatlog}

                    />}
                
            </div>

        );
    

}
export default ServicesOverview;
