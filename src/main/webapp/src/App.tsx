import './App.css';
import * as React from "react";
import {useEffect, useState} from "react";
import 'semantic-ui/dist/semantic.min.css';
import Company from "./employees/Company";
import BackendAlerts from "./BackendAlerts";
import {Admin} from "./Admin";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Home from "./Home";
import OrderConfirm from "./OrderConfirm";
import CompanyService from "./order/CompanyService";
import Order from "./order/Order";
import OrderCount from "./OrderCount";

function App() {
    const [company, setCompany] = useState<Company>(new Company());
    const [order, setOrder] = useState<Order>(new Order());
    const [orderCount, setOrderCount] = useState<OrderCount[]>([]);

    useEffect(() => {
        CompanyService.get((result: Company) => {
            setCompany(result);
        })
    }, []);

    return <BackendAlerts>
        <Router>
            <Switch>
                <Route path="/admin">
                    <Admin/>
                </Route>
                <Route path="/completed">
                    <OrderConfirm customer={order.customer} wishdate={order.firstAppointment!}
                                  services={orderCount.filter(value => value.amount > 0)}
                                  company={company}/>
                </Route>
                <Route path="/">
                    <Home company={company} onOrderCompleted={(order:Order, orderCount: OrderCount[])=> {
                        setOrder(order);
                        setOrderCount(orderCount);
                    }}/>
                </Route>
            </Switch>
        </Router>
    </BackendAlerts>
}

export default App;
