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

interface AppState {
    activeOrder?: Order,
    activeContent:ContentType,
}

interface AppProps {}

class App extends Component<AppProps,AppState> {

  constructor(props: AppProps) {
      super(props);
      this.state = {
          activeContent: ContentType.NONE,
      };
  }

  render() {
    return (
            <Grid centered padded>
                <Grid.Row >
                    <Grid.Column  textAlign={'center'} >
                        <AppHeader/>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column textAlign={'center'} computer={3} tablet={12} mobile={16}>
                        <OrderSearch onSelected={this.openOrder.bind(this)}/>
                    </Grid.Column>
                </Grid.Row>
                <Menu onMenuChanges={this.changeActiveContent.bind(this)} activeContent={this.state.activeContent}/>
                <Grid.Column computer={8} tablet={12} mobile={16}>
                    <div id={"content-container"}>
                        {this.state.activeContent === ContentType.EMPLOYEE? <EmployeeOverview/> : null}
                        {this.state.activeContent === ContentType.ORDER? <OrderOverview/> : null}
                        {this.state.activeContent === ContentType.BILL? <h1>Rechnungen</h1> : null}
                        {this.state.activeContent === ContentType.STATISTICS? <h1>Statistiken</h1> : null}
                        {this.state.activeContent === ContentType.REAL_ESTATE? <RealEstateOverview/>: null}
                        {this.state.activeContent === ContentType.ORDER_DETAILS? <OrderEdit onSave={this.closeOrder.bind(this)} onCancelEdit={this.closeOrder.bind(this)} order={this.state.activeOrder}/> : null}
                    </div>
                </Grid.Column>
            </Grid>
    );
  }

    private changeActiveContent(content: ContentType):void {
        this.setState(Object.assign(this.state, {activeContent: content}));
    }

    private openOrder(order:Order): void {
      this.setState(Object.assign(this.state,{activeOrder: order, activeContent:ContentType.ORDER_DETAILS}))
    }

    private closeOrder() {
        this.setState(Object.assign(this.state, {activeContent: ContentType.NONE, activeOrder: null}));
    }
}

export default App;
