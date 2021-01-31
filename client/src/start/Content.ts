import {ContentType} from "./ContentType";
import {SemanticICONS} from "semantic-ui-react/dist/commonjs/generic";

export class Content {
    constructor(type: ContentType, title: string, icon:SemanticICONS, classNmae: string){
        this.type = type;
        this.title = title;
        this.icon = icon;
        this.className = classNmae;
    }
    type: ContentType;
    title: string;
    icon: SemanticICONS;
    className:string;

}