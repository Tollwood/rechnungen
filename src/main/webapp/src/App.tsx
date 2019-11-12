import './App.css';
import * as React from "react";
import {Component} from "react";
import EmployeeOverview from "./employees/EmployeeOverview";
import 'semantic-ui/dist/semantic.min.css';
import Grid from "semantic-ui-react/dist/commonjs/collections/Grid";
import {ContentType} from "./start/ContentType";
import OrderSearch from "./order/OrderSearch";
import AppHeader from "./Header";
import OrderEdit from "./order/OrderEdit";
import Order from "./order/Order";
import {Menu} from "./start/Menu";
import RealEstateOverview from "./realestate/RealEstateOverview";
import OrderOverview from "./order/OrderOverview";
import LoginModal from './LoginModal';
import API from "./API";
import Company from "./employees/Company";
import ServicesOverview from "./services/ServicesOverview";

interface AppState {
    activeOrder?: Order,
    activeContent: ContentType,
    company: Company
}

interface AppProps {
}

class App extends Component<AppProps, AppState> {

    constructor(props: AppProps) {
        super(props);
        this.state = {
            activeContent: ContentType.NONE,
            company: new Company()
        };
    }

    render() {
        return (
            <React.Fragment>
                <LoginModal onSuccess={() => this.onLogin()}/>
                <Grid centered padded>
                    <Grid.Row>
                        <Grid.Column textAlign={'center'}>
                            <AppHeader/>
                        </Grid.Column>
                    </Grid.Row>
                    <Menu onMenuChanges={this.changeActiveContent.bind(this)} activeContent={this.state.activeContent} onOpenOrder={this.openOrder.bind(this)}/>
                    <Grid.Column computer={8} tablet={12} mobile={16}>
                        <div id={"content-container"}>
                            {this.state.activeContent === ContentType.EMPLOYEE ? <EmployeeOverview/> : null}
                            {this.state.activeContent === ContentType.ORDER ? <OrderOverview company={this.state.company}/> : null}
                            {this.state.activeContent === ContentType.BILL ? <h1>Rechnungen</h1> : null}
                            {this.state.activeContent === ContentType.STATISTICS ? <h1>Statistiken</h1> : null}
                            {this.state.activeContent === ContentType.REAL_ESTATE ? <RealEstateOverview/> : null}
                            {this.state.activeContent === ContentType.SERVICES ? <ServicesOverview/> : null}
                            {this.state.activeContent === ContentType.ORDER_DETAILS ?
                                <OrderEdit company={this.state.company}
                                           onSave={this.closeOrder.bind(this)}
                                           onCancelEdit={this.closeOrder.bind(this)}
                                           onDelete={this.closeOrder.bind(this)}
                                           order={this.state.activeOrder}/> : null}
                        </div>
                    </Grid.Column>
                </Grid>
            </React.Fragment>
        );
    }

    private changeActiveContent(content: ContentType): void {
        this.setState(Object.assign(this.state, {activeContent: content}));
    }

    private openOrder(order: Order): void {
        this.setState(Object.assign(this.state, {activeOrder: order, activeContent: ContentType.ORDER_DETAILS}))
    }

    private closeOrder() {
        this.setState(Object.assign(this.state, {activeContent: ContentType.NONE, activeOrder: null}));
    }

    private onLogin() {
        API.get('/api/company/1')
            .then(result => result.data)
            .then(data => this.setState({company: data}))
    }
}

export default App;
