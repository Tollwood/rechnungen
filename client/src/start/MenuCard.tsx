import * as React from "react";
import { Content } from "./Content";
import { Card, CardHeader, CardContent } from "@mui/material";

export class MenuCard extends React.Component<{ content: Content }> {
  render() {
    return (
      <Card className={this.props.content.className}>
        <CardHeader textAlign={"center"}>{/* <Icon name={this.props.content.icon} size="massive" /> */}</CardHeader>
        <CardContent>
          <span>{this.props.content.title}</span>
        </CardContent>
      </Card>
    );
  }
}
