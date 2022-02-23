import { Card, Icon } from "semantic-ui-react";
import * as React from "react";
import { Content } from "./Content";

export class MenuCard extends React.Component<{ content: Content }> {
  render() {
    return (
      <Card className={this.props.content.className}>
        <Card.Header textAlign={"center"}>
          <Icon name={this.props.content.icon} size="massive" />
        </Card.Header>
        <Card.Content textAlign={"center"}>
          <span>{this.props.content.title}</span>
        </Card.Content>
      </Card>
    );
  }
}
