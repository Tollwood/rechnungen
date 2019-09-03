import {ContentType} from "./ContentType";
import {SemanticICONS} from "semantic-ui-react/dist/commonjs/generic";

export class Content {
    constructor(type: ContentType, title: string, icon:SemanticICONS){
        this.type = type;
        this.title = title;
        this.icon = icon;
    }
    type: ContentType;
    title: string;
    icon: SemanticICONS;

}