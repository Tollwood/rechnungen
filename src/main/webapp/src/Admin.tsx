import './App.css';
import * as React from "react";
import {useEffect, useState} from "react";
import EmployeeOverview from "./employees/EmployeeOverview";
import 'semantic-ui/dist/semantic.min.css';
import Grid from "semantic-ui-react/dist/commonjs/collections/Grid";
import {ContentType} from "./start/ContentType";
import AppHeader from "./Header";
import OrderEdit from "./order/OrderEdit";
import {Menu} from "./start/Menu";
import RealEstateOverview from "./realestate/RealEstateOverview";
import OrderOverview from "./order/OrderOverview";
import LoginModal from './LoginModal';
import Company from "./employees/Company";
import ServicesOverview from "./services/ServicesOverview";
import BackendAlerts from "./BackendAlerts";
import StatisticOverview from "./statistic/StatisticOverview";
import CompanyService from "./order/CompanyService";
import CategoryOverview from "./category/CategoryOverview";
import CompanyEdit from "./CompanyEdit";
import HomeEdit from "./HomeEdit";

export function Admin() {

    const [activeContent, setActiveContent] = useState<ContentType>(ContentType.NONE);
    const [company, setCompany] = useState<Company>(new Company());

    useEffect(() => {
        document.title = "Admin";
        CompanyService.get(((company => {
            document.title = company.name;
            setCompany(company);
        })));
    }, []);

    function closeOrder() {
        setActiveContent(ContentType.NONE);
    }

    function closeCompany() {
        setActiveContent(ContentType.NONE);
        CompanyService.get(setCompany);
    }

    return (
        <BackendAlerts>
            <React.Fragment>
                <LoginModal company={company}/>
                <Grid centered padded>
                    <AppHeader company={company}/>
                    <Menu onMenuChanges={setActiveContent} activeContent={activeContent} company={company}/>
                    <Grid.Column computer={12} tablet={12} mobile={16}>
                        <div id={"content-container"}>
                            {activeContent === ContentType.EMPLOYEE ? <EmployeeOverview company={company}/> : null}
                            {activeContent === ContentType.ORDER ? <OrderOverview company={company}/> : null}
                            {activeContent === ContentType.BILL ? <h1>Rechnungen</h1> : null}
                            {activeContent === ContentType.STATISTICS ? <StatisticOverview/> : null}
                            {activeContent === ContentType.REAL_ESTATE ? <RealEstateOverview company={company}/> : null}
                            {activeContent === ContentType.SERVICES ? <ServicesOverview company={company}/> : null}
                            {activeContent === ContentType.CATEGORIES ? <CategoryOverview company={company}/> : null}
                            {activeContent === ContentType.HOME ? <HomeEdit company={company} onClose={closeCompany}/> : null}
                            {activeContent === ContentType.COMPANY ?
                                <CompanyEdit company={company} onChange={setCompany} onClose={closeCompany}/> : null}
                            {activeContent === ContentType.ORDER_DETAILS ?
                                <OrderEdit company={company}
                                           onSave={closeOrder}
                                           onCancelEdit={closeOrder}
                                           onDelete={closeOrder}
                                /> : null}
                        </div>
                    </Grid.Column>
                </Grid>
            </React.Fragment>
        </BackendAlerts>
    );
}