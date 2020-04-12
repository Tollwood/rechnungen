import Link from "../common/Links";

export default class Category {
    name: string = "";
    _links: { self?: Link, services?: Link } = {};
}