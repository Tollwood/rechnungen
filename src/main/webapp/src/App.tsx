import './App.css';
import React, { useState} from "react";
import EmployeeOverview from "./employees/EmployeeOverview";
import 'semantic-ui/dist/semantic.min.css';
import Grid from "semantic-ui-react/dist/commonjs/collections/Grid";
import {ContentType} from "./start/ContentType";
import AppHeader from "./Header";
import OrderEdit from "./order/OrderEdit";
import {Menu} from "./start/Menu";
import RealEstateOverview from "./realestate/RealEstateOverview";
import OrderOverview from "./order/OrderOverview";
import API from "./API";
import Company from "./employees/Company";
import ServicesOverview from "./services/ServicesOverview";
import Link from "./common/Links";
import BackendAlerts from "./BackendAlerts";
import StatisticOverview from "./statistic/StatisticOverview";
import ClientTemplate from './clientTemplate/ClientTemplate';

interface AppState {
    activeOrder?: Link,
    activeContent: ContentType,
    company: Company
}

interface AppProps {
}

const App: React.FC = ()=> {

    const [activeContent,setActiveContent] = useState<ContentType>(ContentType.NONE); 
    const [activeOrder,setActiveOrder] = useState<Link>(); 
    const [company,setCompany] = useState<Company>(); 
    const [clientTemplates,setClientTemplates] = useState<ClientTemplate[]>([]); 

    React.useEffect(()=>{
        API.get('/api/company/1')
        .then(result => result.data)
        .then(setCompany)
    },[]);
    
    React.useEffect(()=>{
        API.get('/api/client-template')

        .then(res => res.data._embedded === undefined ? [] : res.data._embedded.clientTemplate)
        .then(setClientTemplates)
    },[]);

    const closeOrder= ()=> {
        setActiveContent(ContentType.NONE)
        setActiveOrder(undefined);
    }
    
    if(!company || clientTemplates.length === 0){
        return <div>Loading</div>;
    }
        return (
            <BackendAlerts>
                <React.Fragment>
                    
                    <Grid centered padded>
                        <Grid.Row centered>
                            <Grid.Column computer={12} tablet={12} mobile={16}>
                                <AppHeader company={company}/>
                            </Grid.Column>
                        </Grid.Row>
                        <Menu onMenuChanges={setActiveContent} activeContent={activeContent}/>
                        <Grid.Column computer={12} tablet={12} mobile={16}>
                            <div id={"content-container"}>
                                {activeContent === ContentType.EMPLOYEE ? <EmployeeOverview/> : null}
                                {activeContent === ContentType.ORDER ? <OrderOverview company={company} clientTemplates={clientTemplates}/> : null}
                                {activeContent === ContentType.BILL ? <h1>Rechnungen</h1> : null}
                                {activeContent === ContentType.STATISTICS ? <StatisticOverview/> : null}
                                {activeContent === ContentType.REAL_ESTATE ? <RealEstateOverview /> : null}
                                {activeContent === ContentType.SERVICES ? <ServicesOverview clientTemplates={clientTemplates}/> : null}
                                {activeContent === ContentType.ORDER_DETAILS ?
                                    <OrderEdit company={company}
                                               clientTemplates={clientTemplates}
                                               onSave={closeOrder}
                                               onCancelEdit={closeOrder}
                                               onDelete={closeOrder}
                                               orderLink={activeOrder}/> : null}
                            </div>
                        </Grid.Column>
                    </Grid>
                </React.Fragment>
            </BackendAlerts>
        );
    

    
}

export default App;
