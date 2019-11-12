import * as React from "react";
import Company from "./employees/Company";


export default class AppHeader extends React.Component<{company:Company}> {

    render () {
            return (
                <div>
                    <h1 className="header-title">
                        {this.props.company.name}
                    </h1>
                </div>
            );
    }

}