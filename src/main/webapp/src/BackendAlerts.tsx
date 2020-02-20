import {AlertType, positions, Provider as AlertProvider, transitions} from "react-alert";
import * as React from "react";
import {Button, SemanticICONS} from "semantic-ui-react";

export default function BackendAlerts(props: { children: any }) {
    // @ts-ignore
    const AlertTemplate = (props: AlertComponentPropsWithStyle) => (
        <div style={{"opacity": 0.75}}>
            <Button fluid color={alertColor(props.options.type)} onClick={props.close} icon={alertIcon(props.options.type)} content={props.message}/>
        </div>
    );

    function alertColor(type?: AlertType) {
        if (type === 'error') {
            return "red"
        }
        if (type === 'success') {
            return "green"
        }
        return "blue"
    }

    function alertIcon(type?: AlertType): SemanticICONS {
        if (type === 'error') {
            return "exclamation"
        }
        if (type === 'success') {
            return "check"
        }
        return "info"
    }

// optional cofiguration
    const alertOptions = {
        // you can also just use 'bottom center'
        position: positions.MIDDLE_RIGHT,
        timeout: 5000,
        offset: '30px',
        // you can also just use 'scale'
        transition: transitions.SCALE
    };


    return <AlertProvider template={AlertTemplate} {...alertOptions}>
        {props.children}
    </AlertProvider>


}