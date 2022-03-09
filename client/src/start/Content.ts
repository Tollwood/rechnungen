import { ContentType } from "./ContentType";

export class Content {
  constructor(type: ContentType, title: string, icon: any, classNmae: string, link: string) {
    this.type = type;
    this.title = title;
    this.icon = icon;
    this.className = classNmae;
    this.link = link;
  }
  type: ContentType;
  title: string;
  icon: any;
  className: string;
  link: string;
}
