import * as React from "react";
import {Page} from "../common/Page";
import Company from "../employees/Company";
import Category from "./Category";
import CategoryList from "./CategoryList";
import CategoryEdit from "./CategoryEdit";

interface Props {
    company: Company,
}

interface State {
    categories: Category[]
    selectedItem: Category,
    edit: boolean,
    isLoading: boolean
    page: Page
}

export default class CategoryOverview extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {categories: [], edit: false, selectedItem: new Category(this.props.company._links.self!.href), isLoading: true, page: new Page('name')};
    }

    render() {
        return (
            <div className={"category-overview"}>
                {this.state.edit ? null :
                    <CategoryList
                                company={this.props.company}
                                 onAdd={this.handleAdd.bind(this)}
                                 onSelect={(category: Category) => {
                                     this.handleSelection(category)
                                 }}

                    />}
                {!this.state.edit ? null :
                    <CategoryEdit
                        company={this.props.company}
                        category={this.state.selectedItem}
                        onCancelEdit={this.handleCancelEdit.bind(this)}
                        onSave={this.handleSave.bind(this)}
                        onDelete={this.handleDelete.bind(this)}
                    />}
            </div>

        );
    }

    private handleAdd() {
        this.setState(Object.assign(this.state, {edit: true, selectedItem: new Category(this.props.company._links.self!.href)}))
    }

    private handleSelection(selectedItem: Category) {
        this.setState(Object.assign(this.state, {edit: true, selectedItem: selectedItem}))
    }

    private handleCancelEdit() {
        this.setState(Object.assign(this.state, {edit: false, selectedItem: new Category(this.props.company._links.self!.href)}))
    }

    private handleDelete() {
        this.setState(Object.assign(this.state, {edit: false, selectedItem: new Category(this.props.company._links.self!.href)}));
    }

    private handleSave() {
        this.setState(Object.assign(this.state, {edit: false, selectedItem: new Category(this.props.company._links.self!.href)}));
    }

}
