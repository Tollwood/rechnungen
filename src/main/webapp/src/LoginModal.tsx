import * as React from "react";
import API from "./API";
import {JwtTokenInterceptor} from "./jwtTokenInterceptor";
import {Button, Form, FormProps, Grid, Label, Modal, Segment} from "semantic-ui-react";

interface LoginModalProps {
    onSuccess: () => void
}

interface LoginModalSate {
    username?: string,
    password?: string
    jwtToken?: string
    requiuresAuthorization: boolean
    validationfailed: boolean
}

export default class LoginModal extends React.Component<LoginModalProps, LoginModalSate> {

    constructor(props: LoginModalProps) {
        super(props);
        this.state = {requiuresAuthorization: true, validationfailed: false}
    }

    render() {
        return (
            <Modal open={this.state.requiuresAuthorization} dimmer={'blurring'} size={"mini"} name="loginModal">
                <Modal.Content>
                    <h2 style={{textAlign: "center"}}>Wärmemessdienst Timm</h2>
                    <Segment raised>
                        {this.state.validationfailed ? this.renderError() : null}
                        <Form onSubmit={this.doLogin.bind(this)}>
                        <Grid centered>
                            <Grid.Row/>
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
                                    label={'Anmelden'} icon={'sign in'} labelPosition={"left"} primary />
                            </Grid.Row>
                        </Grid>
                        </Form>
                    </Segment>
                </Modal.Content>
            </Modal>
        );
    }

    private updateState(name: string, value: string) {
        // @ts-ignore
        this.setState({[name]: value, validationfailed:false})
    }

    private doLogin(event: React.FormEvent<HTMLFormElement>, data: FormProps) {
        event.preventDefault();
        API.post("/authenticate", {
            username: this.state.username,
            password: this.state.password
        })
            .then(result => result.data)
            .then(data => {
                let interceptor = new JwtTokenInterceptor(data.jwttoken);
                API.interceptors.request.use(interceptor.intercept.bind(interceptor));
                this.setState({requiuresAuthorization: false});
                this.props.onSuccess();
            })
            .catch( (error) => {
                this.setState({validationfailed:true})
            });

    }

    private renderError() {
        return <Label id="loginError" as='a' color='red' ribbon>
            Benutzername oder Passwort ungültig
        </Label>;
    }
}