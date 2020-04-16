import * as React from "react";
import Company from "./employees/Company";
import {Header} from "semantic-ui-react";


export default class AppHeader extends React.Component<{ company: Company }> {

    render() {
        return (
            <Header as='h1' textAlign={"center"} className="header-title" image={window.location.origin + this.props.company.logo} content={this.props.company.name}/>
        );
    }

}