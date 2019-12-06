import './App.css';
import * as React from "react";
import {Component} from "react";
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
import API from "./API";
import Company from "./employees/Company";
import ServicesOverview from "./services/ServicesOverview";
import Link from "./common/Links";

interface AppState {
    activeOrder?: Link,
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
                    <Grid.Row centered>
                        <Grid.Column computer={8} tablet={12} mobile={16}>
                            <AppHeader company={this.state.company}/>
                        </Grid.Column>
                    </Grid.Row>
                    <Menu onMenuChanges={this.changeActiveContent.bind(this)} activeContent={this.state.activeContent} />
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
                                           orderLink={this.state.activeOrder}/> : null}
                        </div>
                    </Grid.Column>
                </Grid>
            </React.Fragment>
        );
    }

    private changeActiveContent(content: ContentType): void {
        this.setState(Object.assign(this.state, {activeContent: content}));
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
