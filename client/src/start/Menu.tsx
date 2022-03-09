import * as React from "react";
import { ContentType } from "./ContentType";
import { Content } from "./Content";
import { MenuCard } from "./MenuCard";
import { Link } from "react-router-dom";
import { Paper } from "@mui/material";
interface State {
  contents: Content[];
}

interface Props {}

const Menu: React.FC = () => {
  const contents = [
    new Content(ContentType.ORDER, "Aufträge", "unordered list", "order-overview-card", "/orders"),
    new Content(ContentType.CONTRACTOR, "Auftragnehmer", "address card", "contractor-overview-card", "/contractors"),
    new Content(ContentType.REAL_ESTATE, "Liegenschaften", "home", "realEstate-overview-card", "/real-estates"),
    new Content(ContentType.SERVICES, "Servicekatalog", "sign language", "service-overview-card", "/services"),
  ];
  return (
    <Paper>
      {contents.map((content: Content) => (
        <Link to={content.link} key={content.type}>
          <MenuCard content={content} />
        </Link>
      ))}
    </Paper>
  );

  // } else if (this.state.contents.find((content: Content) => this.props.activeContent === content.type)) {
  //   return (
  //     <Grid.Row>
  //       <Grid.Column computer={12} tablet={12} mobile={16}>
  //         <h1>
  //           <Icon name={this.getContent(this.props.activeContent).icon} />
  //           <span className={"menu-title"}>{this.getContent(this.props.activeContent).title}</span>
  //           <Icon
  //             className={"close"}
  //             style={{ float: "right" }}
  //             name={"close"}
  //             size={"small"}
  //             onClick={() => {
  //               this.props.onMenuChanges(ContentType.NONE);
  //             }}
  //           />
  //         </h1>
  //       </Grid.Column>
  //     </Grid.Row>
  //   );
  // }
  //return <span />;

  // function getContent(type: ContentType): Content {
  //   return contents.filter((value: Content) => value.type === type)[0];
  // }
};

export default Menu;
