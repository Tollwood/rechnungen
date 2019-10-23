import * as React from "react";
import API from "./API";
import {JwtTokenInterceptor} from "./jwtTokenInterceptor";
import {Button, Grid, Modal, Form} from "semantic-ui-react";

interface LoginModalProps {
    onSuccess: ()=>void
}
interface LoginModalSate {
    username?: string,
    password?: string
    jwtToken?: string
    requiuresAuthorization: boolean
}

export default class LoginModal extends React.Component<LoginModalProps,LoginModalSate> {

    constructor(props: LoginModalProps){
        super(props);
        this.state = {requiuresAuthorization:true}
    }

    render () {
            return (
                <Modal open={this.state.requiuresAuthorization} dimmer={'blurring'} size={"mini"} name="loginModal">
                    <Modal.Content>
                        <Grid centered>
                            <Grid.Row>
                                <Grid.Column textAlign={'center'}>
                                    <h2>Wärmemessdienst Timm</h2>
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row>
                                <Grid.Column width={16} textAlign={'center'}>
                                    <Form.Field inline>
                                        <Form.Input id="username"
                                                    className="username"
                                                    placeholder='Benutzername'
                                                    value={this.state.username}
                                                    name='username'
                                                    onChange={(e, {name, value}) => this.updateState(name, value)}
                                        />
                                    </Form.Field>
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row>
                                <Grid.Column width={16} textAlign={'center'}>
                                    <Form.Field inline>
                                        <Form.Input id="password"
                                                    className="password"
                                                    type={"password"}
                                                    placeholder='Passwort'
                                                    value={this.state.password}
                                                    name='password'
                                                    onChange={(e, {name, value}) => this.updateState(name, value)}
                                        />
                                    </Form.Field>
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row>
                                <Button
                                    name="login"
                                    label={'Anmelden'} icon={'sign in'} labelPosition={"left"} primary onClick={this.doLogin.bind(this)}/>
                            </Grid.Row>
                        </Grid>
                    </Modal.Content>
                </Modal>
            );
    }

    private updateState(name: string, value: string) {
        // @ts-ignore
        this.setState({[name]: value})
    }

    private doLogin() {
        API.post("/authenticate", {
            username: this.state.username,
            password: this.state.password
        })
            .then(result => result.data)
            .then(data => {
                console.log(data.jwttoken);
                let interceptor = new JwtTokenInterceptor(data.jwttoken);
                API.interceptors.request.use(interceptor.intercept.bind(interceptor));
                this.setState({requiuresAuthorization: false});
                this.props.onSuccess();
            });

    }
}